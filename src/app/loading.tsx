
import Image from 'next/image'
export function Loading() {
  return (
    <div className=' flex relative justify-center items-center h-screen '>
      <div className="relative  animate-pin">
      <Image src="/favicons/logo.png" alt="logo" width={100} height={100} 
      className='animate-[loading_3s_ease-in-out_infinite]' />
      </div>
      
    </div>
  )
}

export default Loading
