import path from "node:path";
import { config } from "dotenv";
import mongoose from "mongoose";
import { demoAbout, demoProjects, demoTestimonials } from "../lib/demo-content";
import { defaultPricingTiers, defaultServices } from "../lib/landing-defaults";
import About from "../models/About";
import PricingTier from "../models/PricingTier";
import Project from "../models/Project";
import Service from "../models/Service";
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

  const aboutBefore = await About.exists({ key: "main" });
  await About.findOneAndUpdate(
    { key: "main" },
    { $setOnInsert: { key: "main", ...demoAbout } },
    { upsert: true }
  );
  const aboutInserted = !aboutBefore;

  let servicesAdded = 0;
  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany(defaultServices);
    servicesAdded = defaultServices.length;
  }

  let pricingAdded = 0;
  if ((await PricingTier.countDocuments()) === 0) {
    await PricingTier.insertMany(defaultPricingTiers);
    pricingAdded = defaultPricingTiers.length;
  }

  console.log(
    `Done. Added ${projectsAdded} project(s), ${testimonialsAdded} testimonial(s)` +
      (aboutInserted ? ", about block (initial)." : ", about unchanged.") +
      ` Services: ${servicesAdded ? `+${servicesAdded}` : "unchanged"}.` +
      ` Pricing: ${pricingAdded ? `+${pricingAdded}` : "unchanged"}.` +
      " Skipped duplicate projects/testimonials."
  );
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
