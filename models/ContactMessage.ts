import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    requirements: { type: String, default: "" },
    references: { type: String, default: "" },
    message: { type: String, default: "" },
    offerInterest: { type: String, default: "" },
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
