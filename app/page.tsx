import Sidebar from './layouts/Sidebar'
import IndexSelect from './components/IndexSelect'
import VideoSelect from './_components/VideoSelect'
import VideoPanel from './_components/VideoPanel'
import VideoValidator from './_components/VideoValidator'

export default function Home() {
	return (
		<div className="flex flex-1">
			<Sidebar className="p-4">
				<div className="flex w-full flex-col gap-y-3 px-6">
					<IndexSelect />
					<VideoValidator />
				</div>
				<VideoSelect />
			</Sidebar>
			<main className="flex-1 p-4">
				<VideoPanel />
			</main>
		</div>
	)
}
