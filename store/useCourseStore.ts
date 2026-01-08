import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Course = {
  _id: string
  title: string
  slug: string
  description: string
  originalPrice: number
  discountPercent: number
  finalPrice: number
  instructor: string
  category: string
  duration: string
  level: string
  features: string[]
  certificate: boolean
  thumbnail: string
  logo: string
}

type CourseState = {
  courses: Course[]
  loadingCourses: boolean

  fetchCourses: (instructorId?: string) => Promise<void>
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: [],
      loadingCourses: false,

      fetchCourses: async (instructorId?: string) => {
        set({ loadingCourses: true })
        try {
          const url = instructorId
            ? `/api/instructor-course?instructorId=${instructorId}`
            : '/api/instructor-course'
          const res = await fetch(url)
          const data = await res.json()
          if (data.success) set({ courses: data.courses })
        } catch (err) {
          console.error('Error fetching courses', err)
        } finally {
          set({ loadingCourses: false })
        }
      },
    }),
    { name: 'course-storage' }
  )
)
