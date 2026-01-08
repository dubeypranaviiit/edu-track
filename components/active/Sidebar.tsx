import { Chapter, Item } from "@/types/course";

interface Props {
  chapters: Chapter[];
  selectedItem: Item | null;
  onItemSelect: (item: Item) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ chapters, selectedItem, onItemSelect, isOpen, onToggle }: Props) {
  return (
    <aside className={`w-64 bg-white border-r p-4 ${isOpen ? "block" : "hidden"} md:block`}>
      <button onClick={onToggle} className="mb-4 md:hidden">Close</button>

      {chapters?.map((chapter) => (
        <div key={chapter._id} className="mb-4">
          <h3 className="font-bold">{chapter.title}</h3>
          {chapter.subtopics?.map((subtopic) => (
            <div key={subtopic._id} className="ml-2">
              <p className="text-sm text-gray-700 font-medium">{subtopic.title}</p>
              {subtopic.items?.map((item) => (
                <button
                  key={item._id}
                  onClick={() => onItemSelect(item)}
                  className={`block text-left ml-4 text-sm py-1 ${
                    selectedItem?._id === item._id
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  • {item.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}
