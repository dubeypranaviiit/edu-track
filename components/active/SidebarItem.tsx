import { useState } from "react";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import { Chapter } from "@/types/course";

type Props = {
  chapter: Chapter;
  selectedItemId: string | null;
  onSelect: (itemId: string) => void;
};

export default function SidebarItem({ chapter, selectedItemId, onSelect }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-4">
      <div
        className="flex items-center cursor-pointer font-semibold text-sm"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
        {chapter.title}
      </div>
      {isExpanded && (
        <div className="mt-2 ml-4 space-y-3">
          {chapter.subtopics.map((sub) => (
            <div key={sub._id}>
              <div className="font-medium text-sm mb-1">{sub.title}</div>
              <ul className="ml-3 space-y-1">
                {sub.items.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className={`flex items-center gap-2 px-3 py-1 text-sm rounded cursor-pointer transition-colors ${
                      item.completed ? "bg-green-100 text-green-800" : "hover:bg-gray-100"
                    } ${item.id === selectedItemId ? "bg-blue-100 text-blue-800 font-semibold" : ""}`}
                  >
                    <FileText className="w-4 h-4" />
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

