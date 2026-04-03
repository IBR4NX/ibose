import InteractiveHero from '@/ibovs/interactive-hero';
import wait from '@test/wait'
import Test from "@/components/styles/test"
export default async function Home() {
  await wait(60)
	return (
		<>
		<div className="fixed z-40 bg-amber-100">
		  
		<Test/>
		</div>
		<InteractiveHero />
		</>
		);
  
}
