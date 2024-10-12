'use client'

import { useSelectedData } from '@/app/utils/selectedVideoStore'
import { Suspense } from 'react'
import ReactPlayer from 'react-player'
import { formatDistance } from 'date-fns'
import VideoValidatorSkeleton from './_components/VideoPanelSkeleton'
import HorizontalList from '@/app/components/HorizontalList'
import formatTimestamp from '@/app/utils/formatTimestamp'
import useGenerateGist from './_hooks/useGenerateGist'
import MetadataChips from './_components/MetadataChips'
import useVideo from '@/app/hooks/useVideo'
import VideoValidatorControl from './_components/VideoValidatorControl'
import Section from './_components/Section'
import type { IndexID, VideoID } from '@/networks'
import HashtagsControl from './_components/HashtagsControl'
import { useMutationState } from '@tanstack/react-query'

interface Props {
	indexID: IndexID
	videoID: VideoID
}

function VideoPanel({ indexID, videoID }: Props) {
	const { data: video } = useVideo(indexID, videoID)
	const { isPending: isPendingGist } = useGenerateGist(indexID, videoID)
	const hashtagStates = useMutationState({
		filters: { mutationKey: ['hashtags', indexID, videoID] }
	})
	const isPendingHashtag = hashtagStates[hashtagStates.length - 1]?.status === 'pending'

	return (
		<div className="flex gap-x-6">
			<div className="flex flex-1 flex-col gap-y-4">
				<div className="aspect-video w-full">
					<ReactPlayer controls width="100%" height="100%" url={video.hls?.video_url} />
				</div>
				<p className="text-xl font-bold">{video.metadata.filename}</p>
				<HorizontalList>
					<p>{formatTimestamp(video.metadata.duration)}</p>
					<p>{video.metadata.height}p</p>
					<p>
						{formatDistance(video.indexed_at ?? new Date(), video.created_at, { includeSeconds: true })} for indexing
					</p>
				</HorizontalList>
				<Section title="Topic">
					<MetadataChips color="primary" isLoading={isPendingGist} data={video.metadata.topics} />
				</Section>
				<Section title="Auto-gen Hashtags">
					<MetadataChips isLoading={isPendingGist || isPendingHashtag} data={video.metadata.hashtags} />
				</Section>
			</div>
			<div className="flex basis-60 flex-col gap-y-8 xl:basis-80">
				<VideoValidatorControl video={video} indexID={indexID} />
				<HashtagsControl indexID={indexID} videoID={videoID} />
			</div>
		</div>
	)
}

export default function VideoPanelWithFallback() {
	const { indexID, videoID } = useSelectedData()

	if (!indexID || !videoID) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<p>Select video to see details 🥺</p>
			</div>
		)
	}

	return (
		<div className="h-full w-full rounded-medium border border-gray-100 p-6 shadow-lg shadow-gray-400/30 dark:bg-gray-700/20 dark:shadow-white/20">
			<Suspense fallback={<VideoValidatorSkeleton />}>
				<VideoPanel indexID={indexID} videoID={videoID} />
			</Suspense>
		</div>
	)
}
