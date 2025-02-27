import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images : {
    domains : ['i.imgur.com','placeimg.com'] // <== Domain name
  }
};

export default nextConfig;
