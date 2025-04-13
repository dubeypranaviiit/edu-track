import { Schema, model, models } from "mongoose";

const SubtopicSchema = new Schema(
  {
    title: { type: String, required: true },
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter" },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }], // Array of Item ObjectIds
  },
  { timestamps: true }
);

export default models.Subtopic || model("Subtopic", SubtopicSchema);
