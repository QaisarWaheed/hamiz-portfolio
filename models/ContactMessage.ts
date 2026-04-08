import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export type ContactMessageDoc = InferSchemaType<typeof contactSchema> & {
  _id: mongoose.Types.ObjectId;
};

const ContactMessage: Model<ContactMessageDoc> =
  mongoose.models.ContactMessage ??
  mongoose.model<ContactMessageDoc>("ContactMessage", contactSchema);

export default ContactMessage;
