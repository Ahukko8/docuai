import type {
  MetadataRoute,
} from "next";

import {
  siteConfig,
} from "@/lib/site-config";


export default function sitemap():
  MetadataRoute.Sitemap {
  return [
    {
      url:
        siteConfig.siteUrl,

      changeFrequency:
        "weekly",

      priority:
        1,
    },

    {
      url:
        `${siteConfig.siteUrl}/pricing`,

      changeFrequency:
        "monthly",

      priority:
        0.9,
    },

    {
      url:
        `${siteConfig.siteUrl}/contact`,

      changeFrequency:
        "monthly",

      priority:
        0.7,
    },

    {
      url:
        `${siteConfig.siteUrl}/terms`,

      changeFrequency:
        "yearly",

      priority:
        0.5,
    },

    {
      url:
        `${siteConfig.siteUrl}/privacy`,

      changeFrequency:
        "yearly",

      priority:
        0.5,
    },

    {
      url:
        `${siteConfig.siteUrl}/refund-policy`,

      changeFrequency:
        "yearly",

      priority:
        0.5,
    },
  ];
}