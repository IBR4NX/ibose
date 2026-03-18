'use client';
import { useState, useEffect, ReactNode } from 'react';
import { Header } from '@/components/shared/header';
export default function Layout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 0);
		return () => clearTimeout(timer);
	}, []);
	if (loading) return null;
	return (
		<>
			<Header>jj</Header>
			tttgvbbhhh
			{children}
		</>
	);
}
