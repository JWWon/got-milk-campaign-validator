import { updateVideo, type IndexID, type VideoID } from '@/networks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { VALIDATE_DESCRIPTION_KEY, VALIDATE_STATUS_KEY, ValidateStatus } from '@/app/constants/metadata'
import { toast } from 'react-toastify'
import validateVideos, { ValidateVideosResponse, VideoValidateParams } from '../_actions/validateVideos'

export default function useValidateVideos(indexID: IndexID, videoIDs: VideoID[]) {
	const queryClient = useQueryClient()

	return useMutation<ValidateVideosResponse, AxiosError, VideoValidateParams>({
		async mutationFn(data) {
			// Cleanup previous validate state
			await Promise.all(
				videoIDs.map(async (videoID) => {
					await updateVideo(indexID, videoID, {
						metadata: { [VALIDATE_STATUS_KEY]: '', [VALIDATE_DESCRIPTION_KEY]: '' }
					})
				})
			)
			await queryClient.invalidateQueries({ queryKey: ['video', indexID] })

			return validateVideos({ indexID, videoIDs }, data)
		},
		async onSuccess(videoMap) {
			await Promise.all(
				Object.entries(videoMap).map(async ([videoID, { matched, description }]) => {
					await updateVideo(indexID, videoID as VideoID, {
						metadata: {
							[VALIDATE_STATUS_KEY]: matched ? ValidateStatus.MATCHED : ValidateStatus.NOT_MATCHED,
							[VALIDATE_DESCRIPTION_KEY]: description
						}
					})
				})
			)

			queryClient.invalidateQueries({ queryKey: ['video', indexID] })
		},
		onError(error) {
			if (error.status === 429) {
				toast('Daily generate or search usage exceeded 😢')
			}
		}
	})
}
