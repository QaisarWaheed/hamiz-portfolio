import path from "node:path";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "../models/Admin";

config({ path: path.resolve(process.cwd(), ".env.local") });
config({ path: path.resolve(process.cwd(), ".env") });

const EMAIL = "admin@gmail.com";
const PASSWORD = "admin123";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Add it to .env.local first.");
    process.exit(1);
  }
  await mongoose.connect(uri);
  const email = EMAIL.toLowerCase();
  const passwordHash = await bcrypt.hash(PASSWORD, 10);
  await Admin.findOneAndUpdate(
    { email },
    { email, passwordHash },
    { upsert: true, returnDocument: "after" }
  );
  console.log(`Admin upserted: ${EMAIL}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
