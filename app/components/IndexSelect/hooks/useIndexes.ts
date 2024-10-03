import { getTwelveLabs } from "@/utils/twelvelabs";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ListIndexParams } from "twelvelabs-js";

export default function useIndexes(params: Omit<ListIndexParams, "page"> = {}) {
  return useSuspenseInfiniteQuery({
    queryKey: ["indexes", params],
    queryFn: ({ pageParam }) =>
      getTwelveLabs()
        .index.listPagination({ ...params, page: pageParam })
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
