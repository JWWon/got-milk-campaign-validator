'use client'

import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import QueryProvider from '@/app/_providers/QueryProvider'

export default function Providers({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const router = useRouter()

	return (
		<QueryProvider>
			<NextUIProvider navigate={router.push}>{children}</NextUIProvider>
		</QueryProvider>
	)
}
