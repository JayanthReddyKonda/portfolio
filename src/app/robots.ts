import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://jayanthreddykonda.vercel.app";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/"],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/api/"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}

