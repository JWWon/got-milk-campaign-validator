import { getTwelveLabs } from '@/utils/twelvelabs'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { Index } from 'twelvelabs-js'

export default function useVideo(index: Index, videoID: string) {
	return useSuspenseQuery({
		queryKey: ['video', index.id, videoID],
		queryFn: () => getTwelveLabs().index.video.retrieve(index.id, videoID)
	})
}
