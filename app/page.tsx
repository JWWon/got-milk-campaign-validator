import Sidebar from './layouts/Sidebar'
import IndexSelect from './components/IndexSelect'
import VideoSelect from './_components/VideoSelect'
import VideoValidator from './_components/VideoValidator'

export default function Home() {
	return (
		<div className="flex flex-1">
			<Sidebar className="p-4">
				<div className="w-full px-6">
					<IndexSelect />
				</div>
				<VideoSelect />
			</Sidebar>
			<main className="flex-1 p-4">
				<VideoValidator />
			</main>
		</div>
	)
}
