import Sidebar from './layouts/Sidebar'
import IndexSelect from './components/IndexSelect'
import { Suspense } from 'react'
import { Skeleton } from '@nextui-org/skeleton'
import VideoSelect, { VideoItemSkeleton } from './_components/VideoSelect'
import VideoValidator from './_components/VideoValidator'

export default function Home() {
	return (
		<div className="flex flex-1">
			<Sidebar className="p-4">
				<div className="w-full px-6">
					<Suspense fallback={<Skeleton className="h-10 w-full rounded-medium" />}>
						<IndexSelect />
					</Suspense>
				</div>
				<Suspense fallback={<VideoItemSkeleton />}>
					<VideoSelect />
				</Suspense>
			</Sidebar>
			<main className="flex-1 p-4">
				<VideoValidator />
			</main>
		</div>
	)
}
