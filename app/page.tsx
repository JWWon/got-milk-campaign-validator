import Sidebar from "./_layout/Sidebar";
import IndexSelect from "./_components/IndexSelect";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className='flex flex-1'>
      <form>
        <Sidebar>
          <Suspense fallback={null}>
            <IndexSelect />
          </Suspense>
        </Sidebar>
      </form>
      <main className='flex-1 h-full overflow-y-auto'></main>
    </div>
  );
}
