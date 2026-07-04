import { Schema, model, models, Document, Types } from "mongoose";

export interface IAdminAction extends Document {
  admin: Types.ObjectId;
  action: string;
  targetType: string;
  targetId: Types.ObjectId;
  meta?: any;
  createdAt: Date;
}

const AdminActionSchema = new Schema<IAdminAction>(
  {
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    targetType: { type: String, required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    meta: { type: Schema.Types.Mixed },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default models.AdminAction || model<IAdminAction>("AdminAction", AdminActionSchema);
