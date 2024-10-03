import { Video } from '@/networks'
import { Chip, ChipProps } from '@nextui-org/chip'
import { Skeleton } from '@nextui-org/skeleton'

interface Props extends ChipProps {
	data: Video['metadata'][number]
	isLoading?: boolean
}

export default function MetadataChips({ data: rawData, isLoading, ...chipProps }: Props) {
	const data = typeof rawData === 'string' ? JSON.parse(rawData) : undefined

	if (!rawData || isLoading) {
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
