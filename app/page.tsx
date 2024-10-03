import Sidebar from "./layout/Sidebar";
import IndexSelect from "./components/IndexSelect";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import VideoSelect, { VideoItemSkeleton } from "./_components/VideoSelect";

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
