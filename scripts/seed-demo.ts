import path from "node:path";
import { config } from "dotenv";
import mongoose from "mongoose";
import { demoProjects, demoTestimonials } from "../lib/demo-content";
import Project from "../models/Project";
import Testimonial from "../models/Testimonial";

config({ path: path.resolve(process.cwd(), ".env.local") });
config({ path: path.resolve(process.cwd(), ".env") });

function omitMeta<T extends Record<string, unknown>>(row: T) {
  const { _id, createdAt, updatedAt, ...rest } = row as T & {
    _id?: unknown;
    createdAt?: unknown;
    updatedAt?: unknown;
  };
  return rest;
}

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Add it to .env.local first.");
    process.exit(1);
  }
  await mongoose.connect(uri);

  let projectsAdded = 0;
  for (const p of demoProjects) {
    const exists = await Project.exists({ title: p.title });
    if (!exists) {
      await Project.create(omitMeta(p));
      projectsAdded += 1;
    }
  }

  let testimonialsAdded = 0;
  for (const t of demoTestimonials) {
    const exists = await Testimonial.exists({
      name: t.name,
      message: t.message,
    });
    if (!exists) {
      await Testimonial.create(omitMeta(t));
      testimonialsAdded += 1;
    }
  }

  console.log(
    `Done. Added ${projectsAdded} project(s), ${testimonialsAdded} testimonial(s) (skipped duplicates).`
  );
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
