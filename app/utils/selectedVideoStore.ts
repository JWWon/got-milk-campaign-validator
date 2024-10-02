import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface SelectedVideoState {
  indexID: string | undefined;
  videoID: string | undefined;
  setIndexID: (indexID: string | undefined) => void;
  setVideoID: (videoID: string | undefined) => void;
}

const useSelectedVideoStore = create<SelectedVideoState>()((set) => ({
  indexID: undefined,
  videoID: undefined,
  setIndexID: (indexID) => set({ indexID }),
  setVideoID: (videoID) => set({ videoID }),
}));

export const useSelectedData = () =>
  useSelectedVideoStore(
    useShallow((state) => ({
      indexID: state.indexID,
      videoID: state.videoID,
    }))
  );

export const useIndexID = () =>
  useSelectedVideoStore(
    useShallow((state) => ({
      indexID: state.indexID,
      setIndexID: state.setIndexID,
    }))
  );

export const useVideoID = () =>
  useSelectedVideoStore(
    useShallow((state) => ({
      videoID: state.videoID,
      setVideoID: state.setVideoID,
    }))
  );
