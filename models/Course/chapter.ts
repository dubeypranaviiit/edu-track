import { Schema, model, models } from "mongoose";

const ChapterSchema = new Schema({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  subtopics: [{ type: Schema.Types.ObjectId, ref: "Subtopic" }]
});

export default models.Chapter || model("Chapter", ChapterSchema);
