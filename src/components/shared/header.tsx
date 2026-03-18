"use client"
import React from 'react';
// #######################
//import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { cn } from '@cn';
import { ThemeToggle, ColorToggle, ModeToggle } from './toggles/themeToggle';
//import { DynamicIcon } from "lucide-react/dynamic";
export function Header({ children, className, ...props }: React.ComponentProps<'header'>) {
  const [isTop, setIsTop] = React.useState(true)
  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setIsTop(window.scrollY <= 10);
          ticking = false;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll as EventListener);
  }, []);
	return (
		<header className={cn('bg-card sticky top-0 flex shrink-0 items-center gap-2 border-b  p-2   ', 
		className, !isTop&&"drop-shadow-md/25" ,"drop-shadow-foreground")}
		{...props}
		>
			{/*
				<ClerkPro(vider>
						<Show when='signed-out'>
							<SignInButton />
							<SignUpButton>
								<button className='bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer'>
									Sign Up
								</button>
							</SignUpButton>
						</Show>
						<Show when='signed-in'>i
							<UserButton />
						</Show>
				</ClerkProvider>
						*/}
						{children}
					    <div className='mr-auto flex gap-1 items-center '>
					    <ColorToggle />
					    <ModeToggle />
                {/*
                <DynamicIcon
                  name='camera'
                  color='red'
                  size={24}
                  strokeWidth={2}
                />
                <ThemeToggle />
                <Search/>
                */}
              </div>
		</header>
	);
}