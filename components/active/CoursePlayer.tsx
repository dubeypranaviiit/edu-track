import { Item } from "@/types/course";
import { isYouTubeUrl, getYouTubeEmbedUrl } from "@/lib/video";
interface Props {
  item: Item | null;
}

export default function CoursePlayer({ item }: Props) {
  if (!item?.videoUrl) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a lesson to start
      </div>
    );
  }

  const isYouTube = isYouTubeUrl(item.videoUrl);

  return (
    <div className="h-full bg-black flex items-center justify-center">
      <div className="w-full max-w-6xl aspect-video">
        {isYouTube ? (
          <iframe
            src={getYouTubeEmbedUrl(item.videoUrl)}
            className="w-full h-full rounded-md"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={item.videoUrl}
            controls
            className="w-full h-full rounded-md"
          />
        )}
      </div>
    </div>
  );
}
