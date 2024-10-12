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
	readonly matchedQueries: string[] | undefined

	constructor({ matchedQueries }: { matchedQueries?: string[] }) {
		super('Video is not matched to query')
		this.matchedQueries = matchedQueries
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
						query,
						index_id: indexID,
						threshold: Confidence.HIGH,
						search_options: Object.values(EngineOption),
						filter: { id: [videoID] }
					})
					return { query, matches: data.page_info.total_results }
				})
			)

			const matchedResults = results.filter(({ matches }) => matches > 0)
			const matchThreshold = Math.min(3, data.queries.length)
			if (matchedResults.length >= matchThreshold) {
				description = matchedResults.map(({ query, matches }) => `- ${matches} matches for "${query}"`).join('\n')
			} else {
				throw new ValidateWithSearchError({ matchedQueries: matchedResults.map(({ query }) => query) })
			}
		} catch (err) {
			if (err instanceof ValidateWithSearchError) {
				return {
					matched: false,
					description: err.matchedQueries?.length
						? `Only ${err.matchedQueries.length} queries are matched\n${err.matchedQueries.map((query) => `- "${query}"`).join('\n')}`
						: 'No queries were matched to this video'
				}
			}
			throw err
		}
	}

	return { matched: true, description: description || undefined }
}
