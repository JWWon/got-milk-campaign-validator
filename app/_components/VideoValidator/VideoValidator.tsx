'use client'

import { useSelectedData } from '@/app/utils/selectedVideoStore'
import { Suspense } from 'react'
import ReactPlayer from 'react-player'
import { formatDistance } from 'date-fns'
import VideoValidatorSkeleton from './_components/VideoValidatorSkeleton'
import HorizontalList from '@/app/components/HorizontalList'
import formatTimestamp from '@/app/utils/formatTimestamp'
import useGenerateGist from './_hooks/useGenerateGist'
import MetadataChips from './_components/MetadataChips'
import useVideo from '@/app/hooks/useVideo'
import VideoValidatorControl from './_components/VideoValidatorControl'
import Section from './_components/Section'
import type { IndexID, VideoID } from '@/networks'

interface Props {
	indexID: IndexID
	videoID: VideoID
}

function VideoValidator({ indexID, videoID }: Props) {
	const { data: video } = useVideo(indexID, videoID)
	const { isPending: isPendingGist } = useGenerateGist(indexID, videoID)

	return (
		<div className="flex gap-x-6">
			<div className="flex flex-1 flex-col gap-y-4">
				<ReactPlayer controls width="100%" height="100%" url={video.hls?.video_url} />
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
					<MetadataChips isLoading={isPendingGist} data={video.metadata.hashtags} />
				</Section>
			</div>
			<div className="basis-60 xl:basis-80">
				<VideoValidatorControl video={video} indexID={indexID} />
			</div>
		</div>
	)
}

export default function ValidatorWithFallback() {
	const { indexID, videoID } = useSelectedData()

	if (!indexID || !videoID) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<p>Please select video to validate 🥺</p>
			</div>
		)
	}

	return (
		<div className="h-full w-full rounded-medium border border-gray-100 p-6 shadow-lg shadow-gray-400/30 dark:bg-gray-700/20 dark:shadow-white/20">
			<Suspense fallback={<VideoValidatorSkeleton />}>
				<VideoValidator indexID={indexID} videoID={videoID} />
			</Suspense>
		</div>
	)
}
