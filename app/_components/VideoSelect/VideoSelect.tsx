'use client'

import { useSelectedVideoStore } from '@/app/utils/selectedVideoStore'
import useVideos from './_hooks/useVideos'
import { useShallow } from 'zustand/react/shallow'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import VideoItem from './_components/VideoItem'
import VideoItemSkeleton from './_components/VideoItemSkeleton'
import { RefObject, Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import type { IndexID } from '@/networks'

interface InternalProps {
	indexID: IndexID
}

function VideoSelect({ indexID }: InternalProps) {
	const { videoID, setVideo } = useSelectedVideoStore(
		useShallow((state) => ({
			videoID: state.videoID,
			setVideo: state.setVideo
		}))
	)

	const { data: videos, hasNextPage, fetchNextPage } = useVideos(indexID)

	const [loaderRef] = useInfiniteScroll({
		hasMore: hasNextPage,
		isEnabled: true,
		shouldUseLoader: true,
		onLoadMore: fetchNextPage
	})

	return (
		<div className="flex max-h-[60vh] flex-col gap-y-2 overflow-y-auto">
			{videos.map((v) => {
				const selected = videoID === v._id
				return (
					<Suspense key={v._id} fallback={<VideoItemSkeleton />}>
						<VideoItem
							indexID={indexID}
							videoID={v._id}
							onClick={() => setVideo(v._id)}
							className={twMerge('w-72 px-6', selected ? 'bg-gray-300' : 'opacity-80 hover:opacity-100')}
						/>
					</Suspense>
				)
			})}
			{hasNextPage && <VideoItemSkeleton ref={loaderRef as RefObject<HTMLDivElement>} />}
		</div>
	)
}

export default function VideoSelectWithFallback() {
	const { indexID } = useSelectedVideoStore(useShallow((state) => ({ indexID: state.indexID })))

	if (indexID == null) return null

	return (
		<Suspense fallback={<VideoItemSkeleton />}>
			<VideoSelect indexID={indexID} />
		</Suspense>
	)
}
