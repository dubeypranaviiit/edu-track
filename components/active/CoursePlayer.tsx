// import { Item } from "@/types/course";
// import VideoPlayer from "../student/VideoPlayer";

// export default function CoursePlayer({ item }: { item: Item }) {
//   return (
//     <div className="flex-1 p-4 overflow-auto">
//       {item?.videoUrl ? (
//         <VideoPlayer src={item.videoUrl} />
//       ) : (
//         <div className="text-gray-500 text-center mt-10">
//           Select a video to start learning
//         </div>
//       )}
//     </div>
//   );
// }
import { Item } from "@/types/course";
import VideoPlayer from "../student/VideoPlayer";

export default function CoursePlayer({ item }: { item: Item | null }) {
  return (
    <div className="flex-1 p-4 overflow-auto">
      {item?.videoUrl ? (
        <VideoPlayer src={item.videoUrl} />
      ) : (
        <div className="text-gray-500 text-center mt-10">
          Select a video to start learning
        </div>
      )}
    </div>
  );
}
