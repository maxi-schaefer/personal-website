const nextConfig = {
  ignoreWarnings: [
    { module: /node_modules\/node-fetch\/lib\/index\.js/ },
    { file: /node_modules\/node-fetch\/lib\/index\.js/ },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
