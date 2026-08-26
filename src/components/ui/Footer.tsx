"use client";

/**
 * @file Footer.tsx
 * @description Direct Contact & Transmission Lines Footer for Jayanth Reddy Konda.
 * Features:
 * - Direct email action button (kondajayanthreddy@gmail.com).
 * - Direct phone dialer link (+91 7036086060).
 * - GitHub and LinkedIn profile links.
 * - Quick section navigation and local time indicator (Hyderabad, India UTC+5:30).
 */

import { ArrowUpRight, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { SectionTransition } from "./PixelSectionTransition";

/** GitHub SVG icon */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/** LinkedIn SVG icon */
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/** Navigation links */
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Experience & Education", href: "#experience" },
  { label: "CLI Terminal", href: "#terminal" },
  { label: "Top", href: "#top" },
] as const;

/** Verified social profiles */
const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/JayanthReddyKonda",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jayanthreddykonda/",
    icon: LinkedinIcon,
  },
] as const;

export function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/10 px-6 py-20 sm:px-10 sm:py-28 lg:px-16 bg-[#1c2129]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Direct Outreach & Messaging */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#00ADB5]">
              <Sparkles className="size-3.5" />
              <span>05 — Contact &amp; Transmission Lines</span>
            </div>

            <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-foreground">
              Let&apos;s build intelligent systems together.
            </h2>

            <p className="text-base leading-relaxed text-muted max-w-xl">
              Open for full-time AI/ML Engineering, Distributed Backend Architecture, and high-impact platform roles. Let&apos;s talk.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="mailto:kondajayanthreddy@gmail.com"
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-white/20 active:scale-[0.98]"
              >
                <Mail className="size-4 text-[#00ADB5]" />
                <span>kondajayanthreddy@gmail.com</span>
                <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </a>

              <a
                href="tel:+917036086060"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-muted backdrop-blur-md transition-colors hover:border-white/20 hover:text-foreground"
              >
                <Phone className="size-4 text-[#00ADB5]" />
                <span>+91 7036086060</span>
              </a>
            </div>
          </div>

          {/* Right Column: Channels, Location & Navigation */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                Location &amp; Channels
              </span>

              <div className="flex items-center gap-2 text-sm text-foreground/90 font-mono">
                <MapPin className="size-4 text-[#00ADB5]" />
                <span>Hyderabad, Telangana, India (UTC+5:30)</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-muted transition-all hover:border-white/25 hover:bg-white/10 hover:text-foreground"
                    >
                      <Icon className="size-3.5" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/5 pt-6">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint mb-3 block">
                Quick Navigation
              </span>
              <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-4 gap-y-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-faint font-mono sm:mt-16">
          <p>© {new Date().getFullYear()} Jayanth Reddy Konda. All rights reserved.</p>
          <p className="text-[#00ADB5]">Status: Open for High-Impact Roles</p>
        </div>
      </div>

      <SectionTransition />
    </footer>
  );
}

export default Footer;
