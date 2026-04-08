import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "" },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export type TestimonialDoc = InferSchemaType<typeof testimonialSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const Testimonial: Model<TestimonialDoc> =
  mongoose.models.Testimonial ??
  mongoose.model<TestimonialDoc>("Testimonial", testimonialSchema);

export default Testimonial;
