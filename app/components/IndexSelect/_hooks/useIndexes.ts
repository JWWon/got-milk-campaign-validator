import { retrieveIndexList } from '@/networks'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export default function useIndexes(...[params, config]: Parameters<typeof retrieveIndexList>) {
	return useSuspenseInfiniteQuery({
		queryKey: ['indexes', params],
		queryFn: ({ pageParam }) => retrieveIndexList({ ...params, page: pageParam }, config).then(({ data }) => data),
		select(data) {
			return data.pages.flatMap((page) => page.data)
		},
		initialPageParam: 1,
		getNextPageParam({ page_info }) {
			return page_info.page < page_info.total_page ? page_info.page + 1 : undefined
		}
	})
}
