import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maakeit - Creator & Brand Marketplace",
    short_name: "Maakeit",
    description:
      "Join a thriving community of creators and brands. Connect, collaborate, and grow.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5EFE7",
    theme_color: "#5A4634",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

