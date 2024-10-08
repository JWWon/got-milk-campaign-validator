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

Generate a stringified JSON object that contains the following format:

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
		const { data: rawText } = await generate({ video_id: videoID, prompt: promptWithFormatGuide(data.prompt) }).then(
			({ data }) => data
		)
		const refinedText = rawText.replace(/(`+|json|\n)/g, '')
		console.log({ generate: refinedText })

		try {
			const response: ValidateVideoResponse = JSON.parse(refinedText)
			if (typeof response.matched !== 'boolean' || typeof response.description !== 'string') {
				throw new SyntaxError(`Invalid generate response format: ${refinedText}`)
			}

			if (!response.matched) return response

			description = response.description
		} catch (e) {
			if (e instanceof Error) {
				if (e instanceof SyntaxError) {
					console.error(e)
				}
				throw e
			}
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
