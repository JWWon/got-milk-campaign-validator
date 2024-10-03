'use client'

import { Image } from '@nextui-org/image'
import type { Index } from 'twelvelabs-js'
import useVideo from '../_hooks/useVideo'
import { Chip } from '@nextui-org/chip'
import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	index: Index
	videoID: string
}

export default function VideoItem({ index, videoID, className, ...buttonProps }: Props) {
	const { data: video } = useVideo(index, videoID)

	return (
		<button className={twMerge('py-2', className)} {...buttonProps}>
			<Image
				className="mb-2 aspect-video w-full rounded-none bg-gray-950 object-contain"
				alt={video.metadata.filename}
				src={video.hls?.thumbnailUrls?.[0]}
			/>
			<div className="flex items-center justify-between">
				<p className="truncate font-medium">{video.metadata.filename}</p>
				{video.metadata.status === 'matched' && <Chip color="success">Matched</Chip>}
				{video.metadata.status === 'not_matched' && <Chip color="success">Not Matched</Chip>}
				{!video.metadata.status && <Chip color="warning">Processing</Chip>}
			</div>
		</button>
	)
}
