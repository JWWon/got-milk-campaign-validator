import { Skeleton } from "@nextui-org/skeleton";
import { forwardRef } from "react";

const VideoItemSkeleton = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className='w-full px-6'>
    <Skeleton className='w-full aspect-video mb-2' />
    <Skeleton className='w-3/5 h-6 rounded-full' />
  </div>
));

VideoItemSkeleton.displayName = "VideoItemSkeleton";

export default VideoItemSkeleton;
