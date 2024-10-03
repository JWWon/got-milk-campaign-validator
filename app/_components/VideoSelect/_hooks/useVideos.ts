import { retrieveVideoList } from '@/networks'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export default function useVideos(...[indexID, params, config]: Parameters<typeof retrieveVideoList>) {
	return useSuspenseInfiniteQuery({
		queryKey: ['videos', indexID, params],
		queryFn: ({ pageParam }) =>
			retrieveVideoList(indexID, { ...params, page: pageParam }, config).then(({ data }) => data),
		select(data) {
			return data.pages.flatMap((page) => page.data)
		},
		initialPageParam: 1,
		getNextPageParam({ page_info }) {
			return page_info.page < page_info.total_page ? page_info.page + 1 : undefined
		}
	})
}
