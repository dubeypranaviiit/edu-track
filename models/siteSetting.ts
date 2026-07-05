import { Schema, model, models, Document } from "mongoose";

export interface ISiteSetting extends Document {
  key: string;
  value: boolean | string | number;
  updatedAt: Date;
}

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export default models.SiteSetting || model<ISiteSetting>("SiteSetting", SiteSettingSchema);
