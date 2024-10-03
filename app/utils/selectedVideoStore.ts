import type { Index, Video } from "twelvelabs-js";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface SelectedVideoState {
  index: Index | undefined;
  video: Video | undefined;
  setIndex: (index: Index | undefined) => void;
  setVideo: (video: Video | undefined) => void;
}

export const useSelectedVideoStore = create<SelectedVideoState>()((set) => ({
  index: undefined,
  video: undefined,
  setIndex: (index) => set({ index }),
  setVideo: (video) => set({ video }),
}));

export const useSelectedData = () =>
  useSelectedVideoStore(
    useShallow((state) => ({
      index: state.index,
      video: state.video,
    }))
  );
