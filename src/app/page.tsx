import InteractiveHero from '@/ibovs/interactive-hero';
import wait from '@test/wait'
import Test from "@/components/styles/test"
export default async function Home() {
  await wait(60)
	return (
		<>
		<div className="fixed z-40 bg-amer-100 border border-white top-5 left-20">
		  
		<Test/>
		</div>
		<InteractiveHero />
		</>
		);
  
}
