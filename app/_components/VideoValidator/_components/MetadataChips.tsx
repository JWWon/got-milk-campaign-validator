import { Chip, ChipProps } from '@nextui-org/chip'
import { Skeleton } from '@nextui-org/skeleton'

interface Props extends ChipProps {
	stringifiedData: string | undefined
	isLoading?: boolean
}

export default function MetadataChips({ stringifiedData, isLoading, ...chipProps }: Props) {
	const data = stringifiedData ? JSON.parse(stringifiedData) : undefined

	if (!data || isLoading) {
		return <Skeleton className="h-7 w-40 rounded-full" />
	}

	return (
		<div className="flex items-center gap-x-2">
			{Array.isArray(data) ? (
				data.map((item) => (
					<Chip key={item} {...chipProps}>
						{item}
					</Chip>
				))
			) : (
				<Chip {...chipProps}>{data}</Chip>
			)}
		</div>
	)
}
