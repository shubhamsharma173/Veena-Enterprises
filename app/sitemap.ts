import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy/", "/terms/"].map((path) => ({
    url: business.url + path,
    changeFrequency: "monthly",
    priority: path ? 0.3 : 1,
  }));
}
