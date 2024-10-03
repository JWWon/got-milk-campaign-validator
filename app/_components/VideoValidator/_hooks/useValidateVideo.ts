import { updateVideo, type IndexID, type VideoID } from '@/networks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { VALIDATE_STATUS_KEY } from '@/app/constants/metadata'
import { toast } from 'react-toastify'
import validateVideo, { VideoValidateParams } from '../_actions/validateVideo'

export default function useValidateVideo(indexID: IndexID, videoID: VideoID) {
	const queryClient = useQueryClient()

	return useMutation<void, AxiosError, VideoValidateParams>({
		async mutationFn(data) {
			// Cleanup previous validate state
			await updateVideo(indexID, videoID, { metadata: { [VALIDATE_STATUS_KEY]: undefined } })
			await queryClient.invalidateQueries({ queryKey: ['video', indexID, videoID] })

			await validateVideo(indexID, videoID, data)
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['video', indexID, videoID] })
		},
		onError(error) {
			if (error.status === 429) {
				toast('Daily generate or search usage exceeded 😢')
			}
		}
	})
}
