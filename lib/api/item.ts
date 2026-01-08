import axios from "axios";

export const updateItem = async (
  itemId: string,
  data: {
    title: string;
    type: "video" | "reading" | "assignment";
    content: string;
    uploadType?: "url" | "upload";
    videoUrl?: string;
    file?: File;
  }
) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("type", data.type);
    formData.append("content", data.content);
    if (data.uploadType) formData.append("uploadType", data.uploadType);
    if (data.videoUrl) formData.append("videoUrl", data.videoUrl);
    if (data.file) formData.append("file", data.file);

    const res = await axios.patch(`/api/create-item/${itemId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to update item:", err);
    throw err;
  }
};

export const deleteItem = async (itemId: string) => {
  try {
    const res = await axios.delete(`/api/update-item/${itemId}`);
    return res.data;
  } catch (err) {
    console.error("Failed to delete item:", err);
    throw err;
  }
};
