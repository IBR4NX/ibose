import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const filePath = path.join(process.cwd(), "public/storage", "words.json");
const filePathTest = path.join(process.cwd(), "public/storage", "test.json");

// قراءة البيانات من الملف
export async function GET() {
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileData);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json([]);
  }
}

// حفظ البيانات في الملف
export async function POST(request: Request) {
  console.log("posssst");
  try {
    const newData = await request.json();
    //console.log(newData)
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
    return NextResponse.json({ message: "Saved successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
export async function PUT(req:Request) {
  try {
    const fileData = await fs.readFile(filePathTest, "utf-8");
    const data = JSON.parse(fileData);
    const newData = await req.json();
   // console.log(newData)
    const file=  await fs.writeFile(filePath, JSON.stringify(data, {space:2,quote:"'"}, 1));
   // const file=  await fs.writeFile(filePath, data, null, 2));
    console.log("####### file ########");
    //console.log(file);
    return NextResponse.json({ message: "Saved successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}