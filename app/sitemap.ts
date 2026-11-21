import type { MetadataRoute } from "next";

const siteUrl = "https://dalafestivaltickets.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-11-21T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/dala-festival-2026-tickets`,
      lastModified: new Date("2026-11-22T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${siteUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.2
    }
  ];
}
