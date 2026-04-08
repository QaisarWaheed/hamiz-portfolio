import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    videoUrl: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, default: "General" },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export type ProjectDoc = InferSchemaType<typeof projectSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const Project: Model<ProjectDoc> =
  mongoose.models.Project ?? mongoose.model<ProjectDoc>("Project", projectSchema);

export default Project;
