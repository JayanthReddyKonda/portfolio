import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://jayanthreddykonda.vercel.app";
    const currentDate = new Date();

    return [
        {
            url: `${baseUrl}/`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/work`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.95,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.75,
        },
        {
            url: `${baseUrl}/experience`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/skills`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}

