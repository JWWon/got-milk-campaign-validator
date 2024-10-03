import { getTwelveLabs } from "@/utils/twelvelabs";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { Index, ListVideoParams } from "twelvelabs-js";

export default function useVideos(
  index: Index,
  params: Omit<ListVideoParams, "page"> = {}
) {
  return useSuspenseInfiniteQuery({
    queryKey: ["videos", index.id, params],
    queryFn: ({ pageParam }) =>
      getTwelveLabs()
        .index.video.listPagination(index.id, { ...params, page: pageParam })
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
