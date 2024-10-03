'use client'

import { useSelectedData } from '@/app/utils/selectedVideoStore'
import { Suspense } from 'react'
import ReactPlayer from 'react-player'
import type { Index, Video } from 'twelvelabs-js'
import { formatDistance } from 'date-fns'
import useVideo from '../VideoSelect/_hooks/useVideo'
import VideoValidatorSkeleton from './_components/VideoValidatorSkeleton'
import HorizontalList from '@/app/components/HorizontalList'
import formatTimestamp from '@/app/utils/formatTimestamp'
import useInjectGistToMetadata from './_hooks/useMutateGist'
import MetadataChips from './_components/MetadataChips'

interface Props {
	index: Index
	video: Video
}

function VideoValidator({ index, video: { id: videoID } }: Props) {
	const { data: video } = useVideo(index, videoID)
	const { isLoading } = useInjectGistToMetadata(index, video)

	return (
		<div className="flex gap-x-6">
			<div className="flex flex-1 flex-col gap-y-4">
				<ReactPlayer controls width="100%" height="100%" url={video.hls?.videoUrl} />
				<p className="text-xl font-bold">{video.metadata.filename}</p>
				<HorizontalList>
					<p>{formatTimestamp(video.metadata.duration)}</p>
					<p>{video.metadata.height}p</p>
					<p>
						Takes {formatDistance(video.indexedAt ?? new Date(), video.createdAt, { includeSeconds: true })} for
						indexing
					</p>
				</HorizontalList>
				<div className="flex flex-col gap-y-2">
					<p className="text-lg font-semibold">Topics</p>
					<MetadataChips color="primary" isLoading={isLoading} stringifiedData={video.metadata.topics} />
				</div>
				<div className="flex flex-col gap-y-2">
					<p className="text-lg font-semibold">Auto-gen hashtags</p>
					<MetadataChips isLoading={isLoading} stringifiedData={video.metadata.hashtags} />
				</div>
			</div>
			<div className="flex basis-60 flex-col gap-y-4">{/*  */}</div>
		</div>
	)
}

export default function ValidatorWithFallback() {
	const { index, video } = useSelectedData()

	if (!index || !video) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<p>Please select video to validate 🥺</p>
			</div>
		)
	}

	return (
		<div className="h-full w-full rounded-medium border border-gray-100 p-6 shadow-lg shadow-gray-400/30 dark:bg-gray-700/20 dark:shadow-white/20">
			<Suspense fallback={<VideoValidatorSkeleton />}>
				<VideoValidator index={index} video={video} />
			</Suspense>
		</div>
	)
}
