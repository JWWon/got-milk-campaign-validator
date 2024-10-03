'use client'

import { useSelectedData } from '@/app/utils/selectedVideoStore'
import { Suspense, useState } from 'react'
import ReactPlayer from 'react-player'
import type { Index, Video } from 'twelvelabs-js'
import { formatDistance } from 'date-fns'
import VideoValidatorSkeleton from './_components/VideoValidatorSkeleton'
import HorizontalList from '@/app/components/HorizontalList'
import formatTimestamp from '@/app/utils/formatTimestamp'
import useInjectGistToMetadata from './_hooks/useMutateGist'
import MetadataChips from './_components/MetadataChips'
import useVideo from '@/app/hooks/useVideo'
import VideoValidatorControl, { VideoValidatorData } from './_components/VideoValidatorControl'
import Section from './_components/Section'

interface Props {
	index: Index
	video: Video
}

function VideoValidator({ index, video: { id: videoID } }: Props) {
	const { data: video } = useVideo(index, videoID)
	const { isLoading: isLoadingGist } = useInjectGistToMetadata(index, video)

	const [validatorData, setValidatorData] = useState<VideoValidatorData>()

	console.log({ validatorData })

	return (
		<div className="flex gap-x-6">
			<div className="flex flex-1 flex-col gap-y-4">
				<ReactPlayer controls width="100%" height="100%" url={video.hls?.videoUrl} />
				<p className="text-xl font-bold">{video.metadata.filename}</p>
				<HorizontalList>
					<p>{formatTimestamp(video.metadata.duration)}</p>
					<p>{video.metadata.height}p</p>
					<p>{formatDistance(video.indexedAt ?? new Date(), video.createdAt, { includeSeconds: true })} for indexing</p>
				</HorizontalList>
				<Section title="Topic">
					<MetadataChips color="primary" isLoading={isLoadingGist} stringifiedData={video.metadata.topics} />
				</Section>
				<Section title="Auto-gen Hashtags">
					<MetadataChips isLoading={isLoadingGist} stringifiedData={video.metadata.hashtags} />
				</Section>
			</div>
			<div className="basis-60">
				<VideoValidatorControl video={video} onSubmit={setValidatorData} />
			</div>
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
