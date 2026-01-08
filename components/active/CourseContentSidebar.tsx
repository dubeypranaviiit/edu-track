"use client";
import { useState } from "react";
import { ChevronDown, Play, Book, FileText } from "lucide-react";
import clsx from "clsx";
import { Chapter, Item } from "@/types/course";

interface Props {
  chapters: Chapter[];
  selectedItemId?: string;
  onItemSelect: (item: Item) => void;
}

export default function CourseContentSidebar({
  chapters,
  selectedItemId,
  onItemSelect,
}: Props) {
  const [open, setOpen] = useState<string[]>([chapters[0]?._id]);

  const icon = (type: string) => {
    if (type === "video") return <Play className="w-4 h-4" />;
    if (type === "reading") return <Book className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="h-full">
      <div className="sticky top-0 bg-white p-4 border-b font-semibold">
        Course content
      </div>

      {chapters.map((chapter) => (
        <div key={chapter._id}>
          <button
            onClick={() =>
              setOpen((p) =>
                p.includes(chapter._id)
                  ? p.filter((i) => i !== chapter._id)
                  : [...p, chapter._id]
              )
            }
            className="w-full px-4 py-3 flex items-center gap-2 font-semibold hover:bg-gray-100"
          >
            <ChevronDown
              className={clsx(
                "w-4 h-4 transition-transform",
                !open.includes(chapter._id) && "-rotate-90"
              )}
            />
            {chapter.title}
          </button>

          {open.includes(chapter._id) &&
            chapter.subtopics.map((sub) => (
              <div key={sub._id} className="pl-6">
                <div className="py-2 text-xs font-semibold uppercase text-gray-500">
                  {sub.title}
                </div>

                {sub.items.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => onItemSelect(item)}
                    className={clsx(
                      "w-full flex items-center gap-3 px-4 py-2 text-sm text-left",
                      selectedItemId === item._id
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                        : "hover:bg-gray-100"
                    )}
                  >
                    {icon(item.type)}
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

