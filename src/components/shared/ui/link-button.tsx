import Link from "next/link";
import { Button } from "@/components/ui/button";

import React from 'react'
import cn from "@/shadcn/utils";

interface Props{
  classButton?:string; // class button 
  className?:string; // class link in button
  link?:string;
  href?:string;
  // children?:React
  propsLink?:React.ComponentProps<'a'>;
}
export function LinkButton({className="",href="/",children,link,classButton,propsLink,...props}:React.ComponentProps<typeof Button>&Props) {
  return (
		<Button
    asChild
			className={cn(classButton)}
			{...props}
		>
			<Link
				href={link ?? href}
				className={cn("  ", className)}
				{...propsLink}
			>
				{children}
			</Link>
		</Button>
	);
}

export default LinkButton
