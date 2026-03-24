"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { FileQuestion, Search, Home, MoveLeft, SearchIcon } from "lucide-react";
import LinkButton from "@/components/shared/ui/link-button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
// import { headers } from 'next/headers';
export default function NotFound() {
	const [query, setQuery] = useState("");
	const router = useRouter();
	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			router.push(`/search?q=${encodeURIComponent(query)}`);
		}
	};
	//  const headersList = await headers();
	// const domain = headersList.get("host");
	// const data = await getSiteData(domain);
	// console.log();
	// headersList.forEach((v,k)=>{
	//   console.log(k," - ",v);
	// })

	return (
		<div className="flex items-center justify-center h-full  px-4">
			<Empty className="max-w-md w-full border-none shadow-none">
				<EmptyMedia>
					<div className="p-4 bg-secondary rounded-full">
						<FileQuestion className="w-12 h-12 text-primary" />
					</div>
				</EmptyMedia>

				<EmptyHeader>
					<EmptyTitle className="text-4xl">404 </EmptyTitle>
					<EmptyDescription className="text-xl">
						عذراً، لم نتمكن من العثور على الصفحة المطلوبة. حاول البحث مجدداً.
					</EmptyDescription>
				</EmptyHeader>

				<EmptyContent className="space-y-6">
					{/* Search Form */}
					<form
						onSubmit={handleSearch}
						className="relative fle items-center gap-2"
					>
						<InputGroup>
							<InputGroupInput
								type="text"
								placeholder="ابحث هنا..."
								className="pl-10 h-11"
								value={query}
								onChange={e => setQuery(e.target.value)}
							/>
							<InputGroupAddon align={"inline-end"}>
								<InputGroupButton
									type="submit"
									variant="outline"
									className="px-4"
								>
									بحث
								</InputGroupButton>
							</InputGroupAddon>
							<InputGroupAddon align="inline-start">
								<SearchIcon className="text-muted-foreground" />
							</InputGroupAddon>
						</InputGroup>
					</form>
					{/* Action Buttons */}
					<div className="flex w-full flex-col  sm:flex-row items-center *:cursor-pointer  justify-center gap-3">
						<Button
							variant="outline"
							className="w-full sm:w-auto gap-2"
							onClick={() => router.back()}
						>
							<MoveLeft className="w-4 h-4" />
							العودة للخلف
						</Button>
						<LinkButton
							variant="default"
							className="w-full sm:w-auto gap-3 px-4"
						>
							<Home className="w-4 h-4" />
							الرئيسية
						</LinkButton>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
