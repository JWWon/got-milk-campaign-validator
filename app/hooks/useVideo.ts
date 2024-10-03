import { retrieveVideo } from '@/networks'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useVideo(...[indexID, videoID, config]: Parameters<typeof retrieveVideo>) {
	return useSuspenseQuery({
		queryKey: ['video', indexID, videoID],
		queryFn: () => retrieveVideo(indexID, videoID, config).then(({ data }) => data)
	})
}
