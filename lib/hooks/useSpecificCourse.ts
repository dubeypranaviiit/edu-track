import useSWR from "swr";
import axios from "axios";
import { Course } from "@/types/course";

const fetcher = (url: string) => axios.get(url).then(res => res.data.course);

export default function useSpecificCourse(slug: string, clerkId: string | null) {
 
  const shouldFetch = Boolean(slug && clerkId);

  const { data, error, isLoading } = useSWR<Course>(
    shouldFetch ? `/api/specific-course/${slug}?clerkId=${clerkId}` : null,
    fetcher
  );

  return {
    course: data || null,
    isLoading,
    isError: Boolean(error),
  };
}
