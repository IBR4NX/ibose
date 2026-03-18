async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
import Logo from "@/ibovs/logo"
 async function Page(){
  await wait(3000);
  return (
    <>
    <div className="container">
    <Logo size={"60"} />
      <div className="card">Hover me</div>
    </div>
    <div className="h-[5000px] bg-aber-100 g" 
    >
    hhh
    
    <a href="#end" id="top"> end </a>
    </div>
    <div id="end"> 
    <a href="#top" >top</a>
      end</div>
    </>
  )
}

export default Page