'use server'

import { EngineOption, generate, search, type IndexID, type VideoID } from '@/networks'
import { Confidence } from '@/networks/request/search/types'

export interface VideoValidateParams {
	prompt?: string
	queries?: string[]
}

export interface ValidateVideoResponse {
	matched: boolean
	description?: string
}

const promptWithFormatGuide = (prompt: string) => `${prompt}

Print the response with following JSON format below.

{
  "matched": true|false,
  "description": "Video is matched|not matched because,"
}
`

class ValidateWithSearchError extends Error {
	readonly query: string

	readonly videoID: VideoID

	constructor({ query, videoID }: { query: string; videoID: VideoID }) {
		super('Video is not matched to query')
		this.query = query
		this.videoID = videoID
	}
}

export default async function validateVideo(
	indexID: IndexID,
	videoID: VideoID,
	data: VideoValidateParams
): Promise<ValidateVideoResponse> {
	let description = ''

	if (!!data.prompt) {
		const {
			data: { data: text }
		} = await generate({ video_id: videoID, prompt: promptWithFormatGuide(data.prompt) })
		console.log({ generate: text })
		const response: ValidateVideoResponse = JSON.parse(text)

		if ('matched' in response && !response.matched) {
			return response
		}

		if (typeof response.description === 'string') {
			description = response.description
		}
	}

	if (data.queries?.length) {
		try {
			console.log({ queries: data.queries })
			const results = await Promise.all(
				data.queries.map(async (query) => {
					const { data } = await search({
						index_id: indexID,
						query_text: query,
						threshold: Confidence.HIGH,
						search_options: Object.values(EngineOption)
						// filter: { id: [videoID] } // TODO: Uncomment this line after fixing 'filter' field in search request
					})
					if (data.page_info.total_results < 1) {
						throw new ValidateWithSearchError({ query, videoID })
					}
					return { query, matches: data.page_info.total_results }
				})
			)
			description = results.map(({ query, matches }) => `- ${matches} matches for query "${query}"`).join('\n')
		} catch (err) {
			if (err instanceof ValidateWithSearchError) {
				return { matched: false, description: `Query "${err.query}" is not matched to the video ${err.videoID}.` }
			}
			throw err
		}
	}

	return { matched: true, description: description || undefined }
}
