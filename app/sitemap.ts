import type { MetadataRoute } from "next";

const siteUrl = "https://dalafestivaltickets.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-11-24T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/dala-festival-2026-tickets`,
      lastModified: new Date("2026-11-23T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${siteUrl}/dala-festival-2026-venue-location`,
      lastModified: new Date("2026-11-23T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: `${siteUrl}/ferre-gola-nairobi-december-2026`,
      lastModified: new Date("2026-11-23T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/tickets/regular`,
      lastModified: new Date("2026-11-23T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 0.75
    },
    {
      url: `${siteUrl}/tickets/vip`,
      lastModified: new Date("2026-11-23T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 0.75
    },
    {
      url: `${siteUrl}/tickets/vvip`,
      lastModified: new Date("2026-11-23T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 0.75
    },
    {
      url: `${siteUrl}/tickets/table-of-4`,
      lastModified: new Date("2026-11-23T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 0.75
    },
    {
      url: `${siteUrl}/tickets/table-of-8`,
      lastModified: new Date("2026-11-23T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 0.75
    },
    {
      url: `${siteUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.2
    }
  ];
}
