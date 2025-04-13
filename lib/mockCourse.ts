export const mockCourse = {
    id: "course-101",
    title: "Basics of Programming - Level 1",
    progress: 45,
    chapters: [
      {
        id: "ch1",
        title: "Flowcharts",
        subtopics: [
          {
            id: "ft1",
            title: "Flowchart Problems",
            items: [
              { id: "q1", title: "Flowchart Q1", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
              { id: "q2", title: "Flowchart Q2", completed: false, videoUrl: "https://www.w3schools.com/html/movie.mp4" },
              { id: "q3", title: "Flowchart Q3", completed: false, videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" }
            ]
          }
        ]
      },
      {
        id: "ch2",
        title: "Patterns",
        subtopics: [
          {
            id: "pt1",
            title: "Basic Pattern Problems",
            items: [
              { id: "p1", title: "Pattern Q1", completed: true, videoUrl: "https://sample-videos.com/video123/mp4/720/sample_video.mp4" },
              { id: "p2", title: "Pattern Q2", completed: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
            ]
          }
        ]
      },
      {
        id: "ch3",
        title: "Conditionals",
        subtopics: [
          {
            id: "cd1",
            title: "If-Else Problems",
            items: [
              { id: "c1", title: "Conditionals Q1", completed: false, videoUrl: "https://sample-videos.com/video123/mp4/720/sample_video.mp4" },
              { id: "c2", title: "Conditionals Q2", completed: false, videoUrl: "https://www.w3schools.com/html/movie.mp4" }
            ]
          }
        ]
      }
    ]
  };
  