// app/error.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="max-w-md w-full text-center">
				<CardContent className="p-6 space-y-4">
					<h1 className="text-2xl font-bold">حدث خطأ</h1>

					<p className="text-sm text-muted-foreground">{error.message}</p>

					<Button
						onClick={() => reset()}
						className="w-full"
					>
						إعادة المحاولة
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
