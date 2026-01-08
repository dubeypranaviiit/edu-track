import useSWR from "swr";
import { Course } from "@/types/course";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useEnrolledCourses(clerkId: string) {
  const { data, error, isLoading } = useSWR(
    clerkId ? `/api/users/enrolled/${clerkId}` : null,
    fetcher
  );

  return {
    // Map enrollments to course objects
    courses: data?.enrollments?.map((enrollment: any) => enrollment.course) as Course[] || [],
    isLoading,
    isError: error,
  };
}
