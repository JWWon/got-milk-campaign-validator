import type { IndexID, VideoID } from '@/networks'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

interface SelectedVideoState {
	indexID: IndexID | undefined
	videoID: VideoID | undefined
	setIndex: (index: IndexID | undefined) => void
	setVideo: (video: VideoID | undefined) => void
}

export const useSelectedVideoStore = create<SelectedVideoState>()((set) => ({
	indexID: undefined,
	videoID: undefined,
	setIndex: (indexID) => set({ indexID }),
	setVideo: (videoID) => set({ videoID })
}))

export const useSelectedData = () =>
	useSelectedVideoStore(
		useShallow((state) => ({
			indexID: state.indexID,
			videoID: state.videoID
		}))
	)
