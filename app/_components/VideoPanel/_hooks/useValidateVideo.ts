import { updateVideo, type IndexID, type VideoID } from '@/networks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { VALIDATE_DESCRIPTION_KEY, VALIDATE_STATUS_KEY, ValidateStatus } from '@/app/constants/metadata'
import { toast } from 'react-toastify'
import validateVideo, { ValidateVideoResponse, VideoValidateParams } from '../_actions/validateVideo'

export default function useValidateVideo(indexID: IndexID, videoID: VideoID) {
	const queryClient = useQueryClient()

	return useMutation<ValidateVideoResponse, AxiosError, VideoValidateParams>({
		async mutationFn(data) {
			// Cleanup previous validate state
			await updateVideo(indexID, videoID, {
				metadata: { [VALIDATE_STATUS_KEY]: '', [VALIDATE_DESCRIPTION_KEY]: '' }
			})
			await queryClient.invalidateQueries({ queryKey: ['video', indexID, videoID] })

			return validateVideo(indexID, videoID, data)
		},
		async onSuccess({ matched, description }) {
			await updateVideo(indexID, videoID, {
				metadata: {
					[VALIDATE_STATUS_KEY]: matched ? ValidateStatus.MATCHED : ValidateStatus.NOT_MATCHED,
					[VALIDATE_DESCRIPTION_KEY]: description
				}
			})
			queryClient.invalidateQueries({ queryKey: ['video', indexID, videoID] })
		},
		onError(error) {
			if (error.status === 429) {
				toast('Daily generate or search usage exceeded 😢')
			}
		}
	})
}
