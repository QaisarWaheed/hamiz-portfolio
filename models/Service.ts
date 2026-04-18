import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";

const serviceSchema = new Schema(
  {
    order: { type: Number, default: 0 },
    num: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoSource: {
      type: String,
      enum: ["none", "link", "upload"],
      default: "none",
    },
    videoUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export type ServiceDoc = InferSchemaType<typeof serviceSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Service: Model<ServiceDoc> =
  mongoose.models.Service ?? mongoose.model<ServiceDoc>("Service", serviceSchema);

export default Service;
