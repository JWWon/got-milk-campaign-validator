import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	children: React.ReactNode | React.ReactNode[]
	separator?: JSX.Element
	className?: string
}

export default function HorizontalList({
	children,
	separator = <div className="h-1 w-1 rounded-full bg-gray-400" />,
	className
}: Props) {
	return (
		<div className={twMerge('flex flex-wrap items-center gap-2', className)}>
			{Array.isArray(children)
				? children.map((child, index) => (
						<Fragment key={index}>
							{child}
							{index !== children.length - 1 && separator}
						</Fragment>
					))
				: children}
		</div>
	)
}
