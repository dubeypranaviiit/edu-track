import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then(res => res.json())
export const useCourseDetail = (slug: string) => {
  return useSWR(() => (slug ? `/api/instructor/create-course/${slug}` : null), fetcher)
}
