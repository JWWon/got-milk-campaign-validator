import Sidebar from "./_layout/Sidebar";
import IndexSelect from "./_components/IndexSelect";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import VideoSelect, { VideoItemSkeleton } from "./components/VideoSelect";

export default function Home() {
  return (
    <div className='flex flex-1'>
      <Sidebar>
        <div className='w-full px-6'>
          <Suspense
            fallback={<Skeleton className='rounded-medium h-10 w-full' />}
          >
            <IndexSelect />
          </Suspense>
        </div>
        <Suspense fallback={<VideoItemSkeleton />}>
          <VideoSelect />
        </Suspense>
      </Sidebar>
      <main className='flex-1'></main>
    </div>
  );
}
