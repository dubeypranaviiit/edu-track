import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'reading', 'assignment'], required: true },
  uploadType: { type: String, enum: ['upload', 'url'] },
  videoUrl: String,
  content: String,
  resources: [String],
}, { _id: true });
export default models.Item || model("Item", ItemSchema);
