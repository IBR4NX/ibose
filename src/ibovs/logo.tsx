import * as React  from 'react';
import { ComponentProps } from "react"
import { cn } from '@/shadcn/utils';
import { Spinner } from '@/ibovs/spinner';
import Image from 'next/image';
interface Props {
	className: string;
	size?: number;
	props?:ComponentProps<"div">
}
type prp = ComponentProps<"div">& {
	className?:string;
}
export function Logo({ className = "", size =60,props }: Props) {
	return (
		<div className={cn('relative bg-primary animate-[loading_3s_ease-in-out_infinite] ', className)} {...props}>
			<Image src='/favicons/logo/logo.png' alt='logo'
			 width={size} height={size} className=' ab' />
			<Spinner className=' top-0 absolute stroke-ibovs-y' size={size} />
		</div>
	);
}
export default Logo;