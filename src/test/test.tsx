"use client";
import { useState, useEffect} from "react";
import { cn } from "@/shadcn/utils";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
function Test() {
	const [open, setOpen] = useState(false);
	useEffect(()=>{
	 const toolOpen = localStorage.getItem('tool-ibovs');
	 console.log("firstb")
	 console.log(typeof toolOpen)
	 if (typeof toolOpen ==='string') {
	   setOpen(toolOpen)
	 }
	},[])
	const handleOpen=()=>{
	  setOpen(!open)
	  localStorage.setItem('tool-ibovs',open?"false":"true")
	  console.log(localStorage.getItem('tool-ibovs'))
	}
	return (
		<>
		{open?
			<div
				onClick={handleOpen}
				className={cn("min-h-5 min-w-5 ", "fixed z-30 bottom-0 left-0 px-5", open === true ? "w-full " : "")}
			>
				<div className="w-full h-full bg-ibovs px-1">
					<p className="w-4/5 w-3/4 left-auto right-1/2 ">{open ? "T" : "F"}</p>
				</div>
			</div>
			:
			<Button size="icon-sm" variant={'outline'} onClick={handleOpen} 
			className="fixed z-50 left-3 bottom-0 rounded-full">
				<Image
						src='/favicons/logo/logo.png'
						alt='logo'
						width={30}
						height={30}
						/>
			</Button>
		}
		</>
	);
}
export default Test;