export type ServiceRow = {
  _id: string;
  order: number;
  num: string;
  title: string;
  description: string;
  videoSource?: "none" | "link" | "upload";
  videoUrl?: string;
};

export type ProjectItem = {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
};

export type TestimonialItem = {
  _id: string;
  name: string;
  role: string;
  message: string;
  imageUrl?: string;
};

export type PricingRow = {
  _id: string;
  order: number;
  name: string;
  who: string;
  priceAmt: string;
  priceUnit: string;
  featured: boolean;
  badge: string;
  features: string[];
  bookLabel: string;
};
