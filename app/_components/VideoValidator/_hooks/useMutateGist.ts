import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { Index, Video } from 'twelvelabs-js'
import type { APIError } from 'twelvelabs-js/dist/error'

export default function useInjectGistToMetadata(index: Index, video: Video) {
	const [isLoading, setIsLoading] = useState(false)
	const queryClient = useQueryClient()

	const mutateGist = useMutation<void, APIError>({
		mutationFn: async () => {
			setIsLoading(true)
			const gist = await video.generateGist(['topic', 'hashtag'])
			await video.update({ metadata: { hashtags: JSON.stringify(gist.hashtags), topics: JSON.stringify(gist.topics) } })
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['video', index.id, video.id] })
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

	useEffect(() => {
		if (!!video.metadata.hashtags && !!video.metadata.topics) return
		mutateGist.mutate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [video.metadata.hashtags, video.metadata.topics])

	return { isLoading }
}
