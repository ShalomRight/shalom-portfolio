/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Contentful CDN — all asset URLs start with this
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        // Contentful direct (non-image-transformed) assets
        protocol: "https",
        hostname: "assets.ctfassets.net",
      },
      {
        // Contentful videos / downloads
        protocol: "https",
        hostname: "downloads.ctfassets.net",
      },
    ],
  },
};

export default nextConfig;
