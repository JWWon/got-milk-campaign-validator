import { twMerge } from 'tailwind-merge'

export default function Sidebar({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={twMerge('h-fit max-h-[calc(100vh-var(--navbar-height))] min-w-80', className)}>
			<aside className="flex h-full w-full flex-col gap-y-3 rounded-medium border border-gray-100 py-6 shadow-lg shadow-gray-400/30 dark:bg-gray-700/20 dark:shadow-white/20">
				{children}
			</aside>
		</div>
	)
}
