import Sidebar from "./_layout/Sidebar";
import IndexSelect from "./_components/IndexSelect";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/skeleton";

export default function Home() {
  return (
    <div className='flex flex-1'>
      <Sidebar>
        <Suspense
          fallback={<Skeleton className='rounded-medium h-10 w-full' />}
        >
          <IndexSelect />
        </Suspense>
      </Sidebar>
      <main className='flex-1 h-full overflow-y-auto'></main>
    </div>
  );
}
