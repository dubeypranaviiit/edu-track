import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then(res => res.json())
export const useCourses = () => {
  return useSWR("/api/create-course", fetcher)
}
