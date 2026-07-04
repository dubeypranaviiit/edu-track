import { Menu } from "lucide-react";

interface Props {
  title: string;
  onMenuClick?: () => void;
}

export default function CourseHeader({ title, onMenuClick }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm">
      {onMenuClick ? (
        <button onClick={onMenuClick} className="lg:hidden text-gray-600" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      ) : (
        <div className="w-5" />
      )}
      <h1 className="text-xl font-semibold">{title}</h1>
      <button className="bg-indigo-600 text-white px-4 py-1.5 rounded text-sm">
        Complete and Continue
      </button>
    </div>
  );
}
