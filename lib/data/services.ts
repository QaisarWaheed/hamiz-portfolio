import { connectDB } from "@/lib/db";
import {
  defaultServices,
  fallbackLandingServices,
  type LandingServiceDisplay,
} from "@/lib/landing-fallbacks";
import type { ServiceRow } from "@/lib/landing-types";
import Service from "@/models/Service";
import { serializeId } from "./serialize";

function toServiceRow(raw: Record<string, unknown>): ServiceRow {
  const row = serializeId(raw as { _id: string } & Record<string, unknown>);
  const src = row.videoSource;
  const videoSource =
    src === "link" || src === "upload" ? src : ("none" as const);
  return {
    _id: row._id as string,
    order: Number(row.order ?? 0),
    num: String(row.num ?? ""),
    title: String(row.title ?? ""),
    description: String(row.description ?? ""),
    videoSource,
    videoUrl: String(row.videoUrl ?? ""),
  };
}

function rowsToLandingDisplay(rows: ServiceRow[]): LandingServiceDisplay[] {
  return rows.map((row) => ({
    label: row.title,
    detail: row.description,
  }));
}

export async function listServices(): Promise<ServiceRow[]> {
  try {
    await connectDB();
    const docs = await Service.find().sort({ order: 1, createdAt: 1 }).lean();
    return docs.map((d) => toServiceRow(d as Record<string, unknown>));
  } catch (e) {
    console.error("[data/services] listServices failed:", e);
    return [];
  }
}

export async function getServicesForLanding(): Promise<LandingServiceDisplay[]> {
  try {
    await connectDB();
    const count = await Service.countDocuments();
    if (count === 0) {
      return [...fallbackLandingServices];
    }
    const rows = await listServices();
    if (rows.length === 0) {
      return [...fallbackLandingServices];
    }
    return rowsToLandingDisplay(rows);
  } catch (e) {
    console.error("[data/services] getServicesForLanding failed:", e);
    return [...fallbackLandingServices];
  }
}

export async function replaceAllServices(services: Omit<ServiceRow, "_id">[]): Promise<ServiceRow[]> {
  await connectDB();
  await Service.deleteMany({});
  if (services.length) {
    await Service.insertMany(
      services.map((s, i) => ({
        order: s.order ?? i,
        num: s.num,
        title: s.title,
        description: s.description,
        videoSource: s.videoSource ?? "none",
        videoUrl: s.videoUrl ?? "",
      }))
    );
  }
  return listServices();
}

export async function seedServicesIfEmpty(): Promise<number> {
  await connectDB();
  if ((await Service.countDocuments()) > 0) return 0;
  await Service.insertMany(defaultServices);
  return defaultServices.length;
}
