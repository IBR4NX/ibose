import puppeteer from "puppeteer";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json({ error: "No URL" }, { status: 400 });
    }

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // مهم لتجنب الحظر
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    );

    await page.goto(url, { waitUntil: "networkidle2" });

    // استخراج الفيديو
    const data = await page.evaluate(() => {
      const video = document.querySelector("video");

      if (!video) return null;

      return {
        video: video.src,
        thumbnail: document.querySelector("img")?.src,
      };
    });

    await browser.close();

    if (!data) {
      return Response.json(
        { error: "Video not found" },
        { status: 404 }
      );
    }

    return Response.json(data);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Scraping failed" },
      { status: 500 }
    );
  }
}