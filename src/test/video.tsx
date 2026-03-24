import { useRef, useState } from "react";
import { RiPlayLine, RiPauseFill } from "@remixicon/react";
import { Button } from "@/components/ui";
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
	const handleVideo = () => {
		if (videoRef.current?.paused === false) {
			videoRef.current?.pause();
		}else{
      videoRef.current?.play();
    }
	};
	console.log("x ", videoRef.current?.paused);
	const handleTimeUpdate = () => {
		if (videoRef.current) {
			console.log(videoRef.current.currentSrc);
			setCurrentTime(videoRef.current.currentTime);
		}
	};

	return (
		<div className=" w-2xs bg-amber-200 text-center relative ">
			{/* ربط الـ Ref بعنصر الفيديو */}
			<video
				ref={videoRef}
				onTimeUpdate={handleTimeUpdate}
				width="100%"
				// src="http://localhost:3000/storage/test.mp4"
			>
				<source
					src="/storage/test.mp4"
					type="video/mp4"
				/>
			</video>

			<div
				className=" absolute top-0 m-auto flex justify-center items-center bg-amber-50/5 size-full"
				style={{ marginTop: "10px" }}
			>
				{/* <p>Time: {controllerRef.current.formatTime(currentTime)}</p> */}

				<Button
					onClick={handleVideo}
					className=""
				>
          {!videoRef.current?.paused?
					<RiPauseFill />
          :
					<RiPlayLine />
          }
				</Button>
			</div>
		</div>
	);
}

