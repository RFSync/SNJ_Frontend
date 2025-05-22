import type React from "react";
import type { Metadata } from "next/types";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "RetroWave Prints",
	description: "Vaporwave aesthetic 3D printed models",
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${inter.className} bg-paper min-h-screen`}>
				<Navigation />
				<main>{children}</main>
				<footer className='bg-purple-800 text-purple text-center py-4'>
					<p>
						&copy; {new Date().getFullYear()} RetroWave Prints. All rights
						reserved.
					</p>
					<p>Powered by Dreamers</p>
				</footer>
			</body>
		</html>
	);
}
