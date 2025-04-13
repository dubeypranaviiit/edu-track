// // types/course.ts

// export type Course = {
//   id: string;
//   title: string;
//   progress: number;
//   currentLesson: string;
//   chapters: Chapter[];
// };

// export type Chapter = {
//   id: string;
//   title: string;
//   type: "video" | "assignment";
//   completed: boolean;
//   subtopics: SubtopicGroup[];
// };

// export type SubtopicGroup = {
//   id: string;
//   title: string;
//   items: Subtopic[];
// };

// export type Subtopic = {
//   id: string;
//   title: string;
//   videoUrl:string;
//   completed: boolean;
// };
export interface Item {
  id: string;
  title: string;
  videoUrl: string;
  completed: boolean;
}

export interface Subtopic {
  _id: string;
  title: string;
  items: Item[];
}

export interface Chapter {
  _id: string;
  title: string;
  subtopics: Subtopic[];
}

export interface Course {
  id: string;
  title: string;
  progress: number;
  chapters: Chapter[];
}
