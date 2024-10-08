import { generate, IndexID, updateVideo, VideoID } from '@/networks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const promptWithFormatGuide = (prompt: string) => `${prompt}

Print the 10 hashtags with following array format without any additional description like below.

["hashtag1", "hashtag2", "hashtag3"]
`

export default function useGenerateHashtags(indexID: IndexID, videoID: VideoID) {
	const queryClient = useQueryClient()

	return useMutation<string[], AxiosError, string>({
		mutationKey: ['hashtags', indexID, videoID],
		async mutationFn(prompt) {
			const {
				data: { data: text }
			} = await generate({ video_id: videoID, prompt: promptWithFormatGuide(prompt) })
			console.log({ hashtags: text })
			const response: string[] = JSON.parse(text)

			if (!Array.isArray(response)) {
				throw new Error('Invalid hashtags response')
			}

			return response
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
