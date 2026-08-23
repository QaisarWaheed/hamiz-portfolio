import type { NextConfig } from "next";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim() || "dp42qy9co";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: `/${cloudName}/**` },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
