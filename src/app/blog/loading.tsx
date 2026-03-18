import {Spinner } from "@/ibovs/spinner"
import Image from 'next/image'
export function Loading() {
  return (
    <div className=' flex fixed top-0 h-screen w-screen bg-background justify-center items-center '>
      <div className="relative  animate-[loading_3s_ease-in-out_infinite] ">
      <Image src="/favicons/logo/logo.png" alt="logo" width={50} height={50} 
      className=' ab' />
      <Spinner className=" top-0 absolute stroke-amber-400" />
      </div>
      
    </div>
  )
}

export default Loading
