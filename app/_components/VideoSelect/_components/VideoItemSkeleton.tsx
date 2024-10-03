import { Skeleton } from '@nextui-org/skeleton'
import { forwardRef } from 'react'

const VideoItemSkeleton = forwardRef<HTMLDivElement>((_, ref) => (
	<div ref={ref} className="w-full px-6">
		<Skeleton className="mb-2 aspect-video w-full" />
		<Skeleton className="h-6 w-3/5 rounded-full" />
	</div>
))

VideoItemSkeleton.displayName = 'VideoItemSkeleton'

export default VideoItemSkeleton
