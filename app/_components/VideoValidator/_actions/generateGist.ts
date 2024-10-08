'use server'

import { gist as createGist, IndexID, updateVideo, VideoID } from '@/networks'
import { GistType } from '@/networks/request/generate/types'

export default async function generateGist<T extends GistType[]>(indexID: IndexID, videoID: VideoID, types: T) {
	const { data: gist } = await createGist({ video_id: videoID, types })

	const metadata: Record<string, string> = {}
	Object.entries(gist).forEach(([key, value]) => {
		metadata[key] = JSON.stringify(value)
	})

	await updateVideo(indexID, videoID, { metadata })
}
