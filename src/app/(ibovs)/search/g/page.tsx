"use client"

import { useState } from "react"
import { getInstagramVideo } from "@/actions/download"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Loader2, AlertCircle } from "lucide-react"

export default function ReelsDownloader() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    setError(null)
    setVideoUrl(null)

    const result = await getInstagramVideo(url)

    if (result.error) {
      setError(result.error)
    } else if (result.videoUrl) {
      setVideoUrl(result.videoUrl)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Instagram Reels Downloader</CardTitle>
          <CardDescription>قم بلصق رابط الريلز لتنزيله مباشرة</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              type="url"
              placeholder="https://www.instagram.com/reel/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full"
              dir="ltr"
            />
            
            <Button type="submit" className="w-full" disabled={loading || !url}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري المعالجة...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  تجهيز الفيديو
                </>
              )}
            </Button>
          </form>

          {/* رسالة الخطأ */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center text-sm" dir="rtl">
              <AlertCircle className="ml-2 h-4 w-4" />
              {error}
            </div>
          )}

          {/* نتيجة التحميل */}
          {videoUrl && (
            <div className="mt-6 space-y-3">
              <video 
                src={videoUrl} 
                controls 
                className="w-full rounded-md border"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
              <Button asChild variant="secondary" className="w-full">
                <a href={videoUrl} target="_blank" rel="noopener noreferrer" download>
                  <Download className="mr-2 h-4 w-4" />
                  تنزيل الآن
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
