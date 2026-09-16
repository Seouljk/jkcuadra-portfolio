import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // C:\Dev has its own package-lock.json, so pin the workspace root to this project instead of letting Next infer it.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
