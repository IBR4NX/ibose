"use server"

import {instagramGetUrl} from 'instagram-url-direct';

interface DownloadResult {
  success?: boolean;
  videoUrl?: string;
  error?: string;
}

export async function getInstagramVideo(postUrl: string): Promise<DownloadResult> {
  try {
    // 1. التحقق من صحة الرابط
    if (!postUrl.includes('instagram.com/reel/') && !postUrl.includes('instagram.com/p/')) {
      return { error: 'الرابط غير صالح. يرجى إدخال رابط Instagram صحيح.' };
    }

    // 2. استدعاء المكتبة لاستخراج الروابط المباشرة
    const result = await instagramGetUrl(postUrl);

    // 3. التحقق من نجاح العملية (المكتبة تعيد الروابط في مصفوفة url_list)
    if (!result || !result.url_list || result.url_list.length === 0) {
      return { error: 'تعذر استخراج الفيديو. قد يكون الحساب خاصاً أو أن Instagram يحظر الطلب.' };
    }

    // 4. استخراج رابط MP4 المباشر (أول عنصر في المصفوفة عادة)
    const videoUrl = result.url_list[0];

    return { success: true, videoUrl };

  } catch (error) {
    console.error("Scraping Error:", error);
    return { error: 'حدث خطأ في الخادم أثناء محاولة جلب الفيديو عبر المكتبة.' };
  }
}
