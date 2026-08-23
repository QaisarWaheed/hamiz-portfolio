import path from "node:path";
import { config } from "dotenv";
import mongoose from "mongoose";
import { seedAboutIfEmpty } from "../lib/data/about";
import { seedServicesIfEmpty } from "../lib/data/services";
import { demoAbout, demoProjects, demoTestimonials } from "../lib/demo-content";
import About from "../models/About";
import Project from "../models/Project";
import Service from "../models/Service";
import Testimonial from "../models/Testimonial";

config({ path: path.resolve(process.cwd(), ".env.local") });
config({ path: path.resolve(process.cwd(), ".env") });

function refuseUnlessDemoMode(): void {
  if (process.env.SHOW_DEMO_CONTENT !== "true") {
    console.error(
      'Refusing to run seed:demo: SHOW_DEMO_CONTENT is not "true".\n' +
        "This script inserts demo projects and testimonials and must not run against production.\n" +
        'Set SHOW_DEMO_CONTENT=true in .env.local only when intentionally seeding a dev database.'
    );
    process.exit(1);
  }
}

function omitMeta<T extends Record<string, unknown>>(row: T) {
  const { _id, createdAt, updatedAt, ...rest } = row as T & {
    _id?: unknown;
    createdAt?: unknown;
    updatedAt?: unknown;
  };
  return rest;
}

async function seed() {
  refuseUnlessDemoMode();
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

  const aboutInserted = await seedAboutIfEmpty();
  const servicesAdded = await seedServicesIfEmpty();

  const aboutDoc = await About.findOne({ key: "main" }).lean();
  if (aboutDoc && !(aboutDoc.bio ?? "").trim()) {
    await About.updateOne({ key: "main" }, { $set: demoAbout });
  }

  if ((await Service.countDocuments()) === 0) {
    await seedServicesIfEmpty();
  }

  console.log(
    `Done. Added ${projectsAdded} project(s), ${testimonialsAdded} testimonial(s)` +
      (aboutInserted ? ", about block (initial)." : ", about unchanged.") +
      ` Services: ${servicesAdded ? `+${servicesAdded}` : "unchanged"}.` +
      " Skipped duplicate projects/testimonials."
  );
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
