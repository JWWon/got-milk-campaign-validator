import { useVideoID } from "@/app/utils/selectedVideoStore";

export default function VideoSelect() {
  const { videoID, setVideoID } = useVideoID();
}
