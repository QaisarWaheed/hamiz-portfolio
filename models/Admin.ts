import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export type AdminDoc = InferSchemaType<typeof adminSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const Admin: Model<AdminDoc> =
  mongoose.models.Admin ?? mongoose.model<AdminDoc>("Admin", adminSchema);

export default Admin;
