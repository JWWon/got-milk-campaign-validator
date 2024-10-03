import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import type { Index, Video } from 'twelvelabs-js'

export default function useInjectGistToMetadata(index: Index, video: Video) {
	const [isLoading, setIsLoading] = useState(false)
	const queryClient = useQueryClient()

	const mutateGist = useMutation({
		mutationFn: async () => {
			setIsLoading(true)
			const gist = await video.generateGist(['topic', 'hashtag'])
			await video.update({ metadata: { hashtags: JSON.stringify(gist.hashtags), topics: JSON.stringify(gist.topics) } })
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['video', index.id, video.id] })
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
