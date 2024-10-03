'use server'

import { gist as createGist, IndexID, updateVideo, VideoID } from '@/networks'
import { GistType } from '@/networks/request/generate/types'

export default async function generateGist(indexID: IndexID, videoID: VideoID) {
	const { data: gist } = await createGist({ video_id: videoID, types: [GistType.TOPIC, GistType.HASHTAG] })
	await updateVideo(indexID, videoID, {
		metadata: { topics: JSON.stringify(gist.topics), hashtags: JSON.stringify(gist.hashtags) }
	})
}
