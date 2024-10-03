'use server'

import { EngineOption, generate, search, updateVideo, type IndexID, type VideoID } from '@/networks'
import { VALIDATE_STATUS_KEY, ValidateStatus } from '@/app/constants/metadata'
import { Confidence } from '@/networks/request/search/types'

export type VideoValidateParams =
	| { prompt: string; queries?: never }
	| { prompt?: never; queries: string[] }
	| { prompt: string; queries: string[] }

export default async function validateVideo(indexID: IndexID, videoID: VideoID, data: VideoValidateParams) {
	if (!!data.prompt) {
		const {
			data: { data: text }
		} = await generate({ video_id: videoID, prompt: data.prompt })
		if (JSON.parse(text) !== true) {
			await updateVideo(indexID, videoID, { metadata: { [VALIDATE_STATUS_KEY]: ValidateStatus.NOT_MATCHED } })
			return false
		}
	}

	if (!!data.queries) {
		const responses = await Promise.all(
			data.queries.map((query) =>
				search({
					index_id: indexID,
					query_text: query,
					threshold: Confidence.HIGH,
					search_options: Object.values(EngineOption),
					filter: { id: [videoID] }
				})
			)
		)
		for (const results of responses.map((res) => res.data.page_info.total_results)) {
			if (results < 1) {
				await updateVideo(indexID, videoID, { metadata: { [VALIDATE_STATUS_KEY]: ValidateStatus.NOT_MATCHED } })
				return false
			}
		}
	}

	await updateVideo(indexID, videoID, { metadata: { [VALIDATE_STATUS_KEY]: ValidateStatus.MATCHED } })
	return true
}
