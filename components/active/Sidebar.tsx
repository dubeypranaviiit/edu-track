// import SidebarItem from "./SidebarItem";
// import { Chapter, Item } from "@/types/course";

// interface SidebarProps {
//   chapters: Chapter[];
//   selectedItem: Item;
//   onItemSelect: (item: Item) => void;
//   isOpen: boolean;
//   onToggle: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   chapters,
//   selectedItem,
//   onItemSelect,
//   isOpen,
//   onToggle,
// }) => {
//   return (
//     <aside className={`${isOpen ? "block" : "hidden"} md:block w-64 bg-white border-r shadow-md p-4 overflow-y-auto`}>
//       <h2 className="text-xl font-semibold mb-4">Course Contents</h2>
//       <div className="space-y-4">
//         {chapters.map((chapter) => (
//           <SidebarItem
//             key={chapter.id}
//             chapter={chapter}
//             selectedItemId={selectedItem.id}
//             onSelect={(videoUrl, itemId) => {
//               const item = chapter.subtopics
//                 .flatMap((s) => s.items)
//                 .find((i) => i.id === itemId);
//               if (item) onItemSelect(item);
//             }}
//           />
//         ))}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
import SidebarItem from "./SidebarItem";
import { Chapter, Item,Course,Subtopic, } from "@/types/course";

interface SidebarProps {
  chapters: Chapter[];
  selectedItem: Item | null;
  onItemSelect: (item: Item) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chapters,
  selectedItem,
  onItemSelect,
  isOpen,
  onToggle,
}) => {
  return (
    <aside className={`${isOpen ? "block" : "hidden"} md:block w-64 bg-white border-r shadow-md p-4 overflow-y-auto`}>
      <h2 className="text-xl font-semibold mb-4">Course Contents</h2>
      <div className="space-y-4">
        {chapters.map((chapter) => (
          <SidebarItem
            key={chapter._id}
            chapter={chapter}
            selectedItemId={selectedItem?.id || null}
            onSelect={(itemId) => {
              const item = chapter.subtopics.flatMap((s) => s.items).find((i) => i.id === itemId);
              if (item) onItemSelect(item);
            }}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
