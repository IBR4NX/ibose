import { useRef, useState } from 'react';

// 1. كائن منطق التشغيل (تم إنشاؤه لمحاكاة عمليات معالجة مكلفة)
class VideoController {
  constructor() {
    console.log("Controller initialized! 🛠️"); // ستظهر مرة واحدة فقط
  }

  formatTime(seconds: number): string {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }
}

export default function MyVideoPlayer() {
  const [currentTime, setCurrentTime] = useState(0);

  // 2. Ref للوصول إلى عنصر الفيديو (DOM Reference)
  const videoRef = useRef<HTMLVideoElement>(null);

  // 3. Ref لكائن التحكم (Logic Reference) - نستخدم هنا نمط الـ Lazy Initialization
  const controllerRef = useRef<VideoController | null>(null);

  // التأكد من إنشاء الكائن مرة واحدة فقط وتجاهله في الـ Re-renders اللاحقة
  if (controllerRef.current === null) {
    controllerRef.current = new VideoController();
  }

  // وظائف التحكم
  const handlePlay = () => videoRef.current?.play();
  const handlePause = () => videoRef.current?.pause();

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* ربط الـ Ref بعنصر الفيديو */}
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        width="100%"
        style={{ borderRadius: '8px' }}
        src="http://localhost:3000/storage/video.mp4"
      />

      <div style={{ marginTop: '10px' }}>
        <p>Time: {controllerRef.current.formatTime(currentTime)}</p>
        
        <button onClick={handlePlay} style={buttonStyle}>Play</button>
        <button onClick={handlePause} style={buttonStyle}>Pause</button>
      </div>
    </div>
  );
}

// تنسيق بسيط للأزرار
const buttonStyle = {
  margin: '5px',
  padding: '10px 20px',
  cursor: 'pointer',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '5px'
};
