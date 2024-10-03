'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import useVideo from '@/app/hooks/useVideo'
import type { AxiosError } from 'axios'
import { type IndexID, type VideoID } from '@/networks'
import generateGist from '../_actions/generateGist'

export default function useGenerateGist(indexID: IndexID, videoID: VideoID) {
	const queryClient = useQueryClient()

	const { data: video } = useVideo(indexID, videoID)

	const generateGistMutation = useMutation<void, AxiosError>({
		mutationFn() {
			return generateGist(indexID, videoID)
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['video', indexID, videoID] })
		},
		onError(error) {
			if (error.status === 429) {
				toast('Daily generate usage exceeded 😢')
			}
		}
	})

	const isRequestedRef = useRef(false)
	useEffect(() => {
		if (isRequestedRef.current || (!!video.metadata.hashtags && !!video.metadata.topics)) return
		isRequestedRef.current = true
		generateGistMutation.mutateAsync()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [video.metadata.hashtags, video.metadata.topics])

	return generateGistMutation
}
