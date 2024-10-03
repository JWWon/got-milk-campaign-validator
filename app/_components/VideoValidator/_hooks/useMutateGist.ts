'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import useVideo from '@/app/hooks/useVideo'
import type { AxiosError } from 'axios'
import { type IndexID, type VideoID } from '@/networks'
import { generateGist } from '../_actions/generateGist'

export default function useInjectGistToMetadata(indexID: IndexID, videoID: VideoID) {
	const [isLoading, setIsLoading] = useState(false)
	const queryClient = useQueryClient()

	const { data: video } = useVideo(indexID, videoID)

	const mutateGist = useMutation<void, AxiosError>({
		mutationFn: async () => {
			setIsLoading(true)
			await generateGist(indexID, videoID)
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['video', indexID, videoID] })
		},
		onError(error) {
			if (error.status === 429) {
				toast('Daily generate usage exceeded 😢')
			}
		},
		onSettled() {
			setIsLoading(false)
		}
	})

	const isRequestedRef = useRef(false)
	useEffect(() => {
		if (isRequestedRef.current || (!!video.metadata.hashtags && !!video.metadata.topics)) return
		isRequestedRef.current = true
		mutateGist.mutate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [video.metadata.hashtags, video.metadata.topics])

	return { isLoading }
}
