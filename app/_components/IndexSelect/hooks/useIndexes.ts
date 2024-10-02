import { getTwelveLabs } from "@/utils/twelvelabs";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export default function useIndexes() {
  return useSuspenseInfiniteQuery({
    queryKey: ["indexes"],
    queryFn: ({ pageParam }) =>
      getTwelveLabs()
        .index.listPagination({ page: pageParam })
        .then(({ data, pageInfo }) => ({ data, pageInfo })),
    select(data) {
      return data.pages.flatMap((page) => page.data);
    },
    initialPageParam: 1,
    getNextPageParam({ pageInfo }) {
      return pageInfo.page < pageInfo.totalPage ? pageInfo.page + 1 : undefined;
    },
  });
}
