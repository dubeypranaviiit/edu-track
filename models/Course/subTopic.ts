import { Schema, model, models } from "mongoose";

const SubtopicSchema = new Schema(
  {
    title: { type: String, required: true },
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { timestamps: true }
);

export default models.Subtopic || model("Subtopic", SubtopicSchema);
