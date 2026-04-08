import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";
import { connectDB } from "@/lib/db";

const aboutSchema = new Schema(
  {
    key: { type: String, default: "main", unique: true },
    headline: { type: String, default: "Hamiz Khan" },
    bio: {
      type: String,
      default:
        "Video editor crafting cinematic stories from raw footage. Based on emotion, rhythm, and picture-perfect pacing.",
    },
    email: { type: String, default: "hello@hamizkhan.com" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },
  { timestamps: true }
);

export type AboutDoc = InferSchemaType<typeof aboutSchema> & {
  _id: mongoose.Types.ObjectId;
};

const About: Model<AboutDoc> =
  mongoose.models.About ?? mongoose.model<AboutDoc>("About", aboutSchema);

export async function getOrCreateAbout() {
  await connectDB();
  const doc = await About.findOneAndUpdate(
    { key: "main" },
    { $setOnInsert: { key: "main" } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  if (!doc) throw new Error("Failed to load about document");
  return doc;
}

export default About;
