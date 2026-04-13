import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";

const pricingTierSchema = new Schema(
  {
    order: { type: Number, default: 0 },
    name: { type: String, required: true },
    who: { type: String, default: "" },
    priceAmt: { type: String, default: "" },
    priceUnit: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    badge: { type: String, default: "" },
    features: { type: [String], default: [] },
    bookLabel: { type: String, default: "Start a project" },
  },
  { timestamps: true }
);

export type PricingTierDoc = InferSchemaType<typeof pricingTierSchema> & {
  _id: mongoose.Types.ObjectId;
};

const PricingTier: Model<PricingTierDoc> =
  mongoose.models.PricingTier ??
  mongoose.model<PricingTierDoc>("PricingTier", pricingTierSchema);

export default PricingTier;
