'use server'

import { EngineOption, generate, search, type IndexID, type VideoID } from '@/networks'
import { Confidence, GroupBy } from '@/networks/request/search/types'

export interface VideoValidateParams {
	prompt?: string
	queries?: string[]
}

interface ValidateVideoResponse {
	matched: boolean
	description?: string
}

export type ValidateVideosResponse = { [key: VideoID]: ValidateVideoResponse }

const promptWithFormatGuide = (prompt: string) => `${prompt}

Generate a stringified JSON object that contains the following format:

{
  "matched": true|false,
  "description": "Video is matched|not matched because,"
}
`

export default async function validateVideos(
	{ indexID, videoIDs }: { indexID: IndexID; videoIDs: VideoID[] },
	data: VideoValidateParams
) {
	const videos: ValidateVideosResponse = {}

	if (!!data.prompt) {
		await Promise.all(
			videoIDs.map(async (videoID) => {
				const { data: rawText } = await generate({
					video_id: videoID,
					prompt: promptWithFormatGuide(data.prompt!)
				}).then(({ data }) => data)
				const refinedText = rawText.replace(/(`+|json|\n)/g, '')
				console.debug({ generate: refinedText })

				try {
					const response: ValidateVideoResponse = JSON.parse(refinedText)
					if (typeof response.matched !== 'boolean' || typeof response.description !== 'string') {
						throw new SyntaxError(`Invalid generate response format: ${refinedText}`)
					}
					videos[videoID] = response
				} catch (e) {
					if (e instanceof Error) {
						if (e instanceof SyntaxError) {
							console.error(e)
						}
						throw e
					}
				}
			})
		)
	}

	if (data.queries?.length) {
		console.debug({ queries: data.queries })
		const searchResponses = await Promise.all(
			data.queries.map(async (query) => {
				const { data } = await search({
					query,
					index_id: indexID,
					group_by: GroupBy.video,
					threshold: Confidence.HIGH,
					search_options: Object.values(EngineOption),
					filter: { id: videoIDs }
				})
				return { query, matches: data.data.map(({ id, clips }) => ({ videoID: id, matches: clips.length })) }
			})
		)

		const items: { [key: VideoID]: { query: string; matches: number }[] } = {}
		searchResponses.forEach(({ query, matches }) => {
			matches.forEach(({ videoID, matches }) => {
				if (!items[videoID]) items[videoID] = []
				items[videoID].push({ query, matches })
			})
		})

		const matchThreshold = Math.min(3, data.queries.length)
		Object.entries(items).forEach(([videoID, matches]) => {
			const matchedResults = matches.filter(({ matches }) => matches > 0)
			const isMatched = matchedResults.length >= matchThreshold
			videos[videoID as VideoID] = {
				matched: isMatched,
				description:
					(videos[videoID as VideoID].description ? `${videos[videoID as VideoID].description}\n\n` : '') +
					(matchedResults.length > 0
						? matchedResults.map(({ query, matches }) => `- ${matches} matches for "${query}"`).join('\n')
						: 'No queries were matched to this video')
			}
		})
	}

	return videos
}
