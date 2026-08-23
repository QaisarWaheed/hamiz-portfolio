import type { NextConfig } from "next";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
if (!cloudName) {
  throw new Error(
    "CLOUDINARY_CLOUD_NAME is not set. Add it to .env before building so next/image remotePatterns match your Cloudinary account."
  );
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: `/${cloudName}/**` },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
