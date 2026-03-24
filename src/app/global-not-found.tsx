"use client";
// Import global styles and fonts
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "404 - Page Not Found",
	description: "The page you are looking for does not exist.",
};

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { FileWarning, Home, RefreshCcw } from "lucide-react";

export default function GlobalNotFound() {
	return (
		<html>
			<body className="flex items-center justify-center min-h-screen bg-background antialiased">
				<Empty className="max-w-md border-none shadow-none">
					<EmptyMedia>
						<div className="p-4 bg-destructive/10 rounded-full">
							<FileWarning className="w-12 h-12 text-destructive" />
						</div>
					</EmptyMedia>

					<EmptyHeader>
						<EmptyTitle className="text-3xl font-bold tracking-tight">عذراً، خطأ عالمي 404</EmptyTitle>
						<EmptyDescription className="text-muted-foreground">
							حدث خطأ غير متوقع أو أن المسار الذي تحاول الوصول إليه غير متاح نهائياً في النظام.
						</EmptyDescription>
					</EmptyHeader>

					<EmptyContent className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Button
							asChild
							variant="default"
							className="w-full sm:w-auto gap-2"
						>
							<Link href="/">
								<Home className="w-4 h-4" />
								العودة للرئيسية
							</Link>
						</Button>

						<Button
							variant="outline"
							className="w-full sm:w-auto gap-2"
							onClick={() => window.location.reload()}
						>
							<RefreshCcw className="w-4 h-4" />
							تحديث الصفحة
						</Button>
					</EmptyContent>
				</Empty>
			</body>
		</html>
	);
}
