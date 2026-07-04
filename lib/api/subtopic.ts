import axios from "axios";

export const updateSubtopic = async (subtopicId: string, title: string) => {
  try {
    const res = await axios.patch(`/api/instructor/create-subtopic/${subtopicId}`, { title });
    return res.data;
  } catch (err) {
    console.error("Failed to update subtopic:", err);
    throw err;
  }
};

export const deleteSubtopic = async (subtopicId: string) => {
  try {
    const res = await axios.delete(`/api/instructor/create-subtopic/${subtopicId}`);
    return res.data;
  } catch (err) {
    console.error("Failed to delete subtopic:", err);
    throw err;
  }
};
