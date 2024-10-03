import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Providers from './providers'

import './globals.css'
import Navbar from './components/Navbar'

const geistSans = localFont({
	src: './_fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
})
const geistMono = localFont({
	src: './_fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
})

export const metadata: Metadata = {
	title: 'Got Milk?',
	description: 'Automated validator for Got Milk campaign'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>
					<div className="flex min-h-screen flex-col bg-background text-foreground">
						<Navbar />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	)
}
