'use client'

import { generate, IndexID, updateVideo, VideoID } from '@/networks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const promptWithFormatGuide = (prompt: string) => `${prompt}

Generate an array of 10 hashtags based on its definition with following format:

["hashtag1", "hashtag2", "hashtag3"]

No additional comment is needed.
`

export default function useGenerateHashtags(indexID: IndexID, videoID: VideoID) {
	const queryClient = useQueryClient()

	return useMutation<string[], AxiosError, string>({
		mutationKey: ['hashtags', indexID, videoID],
		async mutationFn(prompt) {
			const { data: text } = await generate({ video_id: videoID, prompt: promptWithFormatGuide(prompt) }).then(
				({ data }) => data
			)
			console.log({ hashtags: text })

			try {
				const response: string[] = JSON.parse(text)
				if (!Array.isArray(response)) {
					throw new SyntaxError('Invalid hashtags response')
				}

				return response
			} catch (e) {
				if (e instanceof Error) {
					if (e instanceof SyntaxError) {
						toast.error(`Invalid hashtags response: "${text}"`)
					}
					throw e
				}

				return []
			}
		},
		async onSuccess(hashtags) {
			await updateVideo(indexID, videoID, {
				metadata: {
					hashtags: JSON.stringify(hashtags)
				}
			})
			queryClient.invalidateQueries({ queryKey: ['video', indexID, videoID] })
		},
		onError(error) {
			if (error.status === 429) {
				toast('Daily generate usage exceeded 😢')
			}
		}
	})
}
