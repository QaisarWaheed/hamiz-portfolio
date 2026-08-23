import type mongoose from "mongoose";

export function serializeId(
  doc: { _id: mongoose.Types.ObjectId | string } & Record<string, unknown>
): Record<string, unknown> {
  return {
    ...doc,
    _id: String(doc._id),
  };
}
