import axios from "axios";

export const updateChapter = async (chapterId: string, title: string) => {
  try {
    const res = await axios.patch(`/api/create-chapter/${chapterId}`, { title });
    return res.data;
  } catch (err) {
    console.error("Failed to update chapter:", err);
    throw err;
  }
};

export const deleteChapter = async (chapterId: string) => {
  try {
    const res = await axios.delete(`/api/create-chapter/${chapterId}`);
    return res.data;
  } catch (err) {
    console.error("Failed to delete chapter:", err);
    throw err;
  }
};
