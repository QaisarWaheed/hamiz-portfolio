import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.higgs.ai", pathname: "/**" },
      { protocol: "https", hostname: "shrug-person-78902957.figma.site", pathname: "/**" },
      { protocol: "https", hostname: "motionsites.ai", pathname: "/**" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
