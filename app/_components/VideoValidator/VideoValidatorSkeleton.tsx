import { Skeleton } from '@nextui-org/skeleton'

export default function VideoValidatorSkeleton() {
	return (
		<div className="flex gap-x-6">
			<div className="flex flex-1 flex-col gap-y-4">
				<Skeleton className="aspect-video w-full" />
				<Skeleton className="h-6 w-32 rounded-full" />
			</div>
		</div>
	)
}
