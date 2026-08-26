import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Jayanth Reddy Konda — AI/ML & Distributed Systems Architect",
        short_name: "JRK Portfolio",
        description: "Production portfolio of Jayanth Reddy Konda — AI/ML Systems Engineer & Distributed Backend Architect.",
        start_url: "/",
        display: "standalone",
        background_color: "#0d4c3c",
        theme_color: "#0d4c3c",
        orientation: "portrait-primary",
        icons: [
            {
                src: "/icon.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
        ],
    };
}

