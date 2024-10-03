"use client";

import { useSelectedVideoStore } from "@/app/utils/selectedVideoStore";
import useVideos from "./hooks/useVideos";
import { useShallow } from "zustand/react/shallow";
import type { Index } from "twelvelabs-js";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import VideoItem from "./components/VideoItem";
import VideoItemSkeleton from "./components/VideoItemSkeleton";
import { RefObject, Suspense } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  selectedIndex: Index;
}

function VideoSelectWithIndex({ selectedIndex }: Props) {
  const { video, setVideo } = useSelectedVideoStore(
    useShallow((state) => ({
      video: state.video,
      setVideo: state.setVideo,
    }))
  );

  const { data: videos, hasNextPage, fetchNextPage } = useVideos(selectedIndex);

  const [loaderRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: true,
    shouldUseLoader: true,
    onLoadMore: fetchNextPage,
  });

  return (
    <div className='flex flex-col gap-y-2 max-h-[60vh] overflow-y-auto'>
      {videos.map((v) => {
        const selected = video?.id === v.id;
        return (
          <Suspense key={v.id} fallback={<VideoItemSkeleton />}>
            <VideoItem
              index={selectedIndex}
              videoID={v.id}
              onClick={() => setVideo(v)}
              className={twMerge(
                "w-72 px-6",
                selected ? "bg-gray-300" : "opacity-80 hover:opacity-100"
              )}
            />
          </Suspense>
        );
      })}
      {hasNextPage && (
        <VideoItemSkeleton ref={loaderRef as RefObject<HTMLDivElement>} />
      )}
    </div>
  );
}

export default function VideoSelect() {
  const { index } = useSelectedVideoStore(
    useShallow((state) => ({ index: state.index }))
  );

  if (index == null) return null;

  return <VideoSelectWithIndex selectedIndex={index} />;
}
