"use client";

import { useEffect, useState, startTransition } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Globe, EyeOff } from "lucide-react";

interface CourseType {
  _id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  isPublished: boolean;
  originalPrice: number;
  discountPercent: number;
  enrollmentCount: number;
  instructor?: {
    name: string;
    email: string;
  };
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  const [actionType, setActionType] = useState<"publish" | "unpublish" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admin/courses?search=${search}`);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [search]);

  const handleAction = async () => {
    if (!selectedCourse || !actionType) return;
    try {
      setActionLoading(true);
      const nextState = actionType === "publish";
      await axios.patch(`/api/admin/courses/${selectedCourse.slug}/publish`, { isPublished: nextState });
      toast.success(`Course successfully ${nextState ? "published" : "unpublished"}`);
      setConfirmOpen(false);
      fetchCourses();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: "Title",
      accessorKey: "title",
      cell: (course: CourseType) => (
        <div className="flex items-center gap-3">
          {course.thumbnail ? (
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-12 h-8 object-cover rounded-md border border-slate-100" 
            />
          ) : (
            <div className="w-12 h-8 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-[10px] text-slate-400">
              No Cover
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 dark:text-slate-100">{course.title}</span>
            <span className="text-xs text-slate-400 font-mono">/{course.slug}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Instructor",
      cell: (course: CourseType) => (
        <div className="flex flex-col">
          <span className="text-slate-700 dark:text-slate-300 font-medium">{course.instructor?.name || "Unknown"}</span>
          <span className="text-xs text-slate-400">{course.instructor?.email || "No Email"}</span>
        </div>
      ),
    },
    {
      header: "Enrollments",
      accessorKey: "enrollmentCount",
      cell: (course: CourseType) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {course.enrollmentCount}
        </span>
      ),
    },
    {
      header: "Price",
      cell: (course: CourseType) => (
        <div className="flex flex-col text-xs text-slate-500">
          <span>Orig: ₹{course.originalPrice}</span>
          {course.discountPercent > 0 && (
            <span className="text-emerald-500">Disc: {course.discountPercent}%</span>
          )}
        </div>
      ),
    },
    {
      header: "Status",
      cell: (course: CourseType) => (
        <StatusBadge status={course.isPublished ? "active" : "suspended"} className={course.isPublished ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-amber-100 text-amber-800 border-amber-200"} />
      ),
    },
    {
      header: "Actions",
      cell: (course: CourseType) => (
        <Button
          size="sm"
          variant={course.isPublished ? "outline" : "default"}
          onClick={() => {
            setSelectedCourse(course);
            setActionType(course.isPublished ? "unpublish" : "publish");
            setConfirmOpen(true);
          }}
          className="cursor-pointer"
        >
          {course.isPublished ? (
            <>
              <EyeOff className="size-4 mr-1" />
              Unpublish
            </>
          ) : (
            <>
              <Globe className="size-4 mr-1" />
              Publish
            </>
          )}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Manage Courses</h1>
        <p className="text-sm text-slate-500 font-medium">Force publish or unpublish student courses, view details and enrollments.</p>
      </div>

      <DataTable
        data={courses}
        columns={columns}
        searchPlaceholder="Search by title..."
        searchKey="title"
        onSearchChange={(s) => {
          startTransition(() => {
            setSearch(s);
          });
        }}
        isLoading={loading}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={actionType === "publish" ? "Publish Course?" : "Unpublish Course?"}
        description={
          actionType === "publish"
            ? `Are you sure you want to force publish "${selectedCourse?.title}"? It will become visible and available for enrollment on the store.`
            : `Are you sure you want to force unpublish "${selectedCourse?.title}"? It will be hidden from public listing.`
        }
        confirmText="Confirm"
        variant={actionType === "unpublish" ? "destructive" : "default"}
        onConfirm={handleAction}
        isLoading={actionLoading}
      />
    </div>
  );
}
