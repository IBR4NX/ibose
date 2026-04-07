import InteractiveHero from '@/ibovs/interactive-hero';
import wait from '@test/wait'
import Test from "@/test/test"
export default async function Home() {
  await wait(60)
	return (
		<>
		<InteractiveHero />
		<Test/>
		</>
		);
  
}
