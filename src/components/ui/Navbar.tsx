"use client";

/**
 * @file Navbar.tsx
 * @description Sleek Floating Capsule Glass Navigation Bar.
 * Features:
 * - Floating frosted glass capsule with dynamic scroll hairline border.
 * - Direct "Download Resume" action button linking to /resume.pdf.
 * - Live node status indicator (● NODE ONLINE).
 * - Responsive mobile drawer with smooth blur overlay.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X, ArrowUpRight, FileDown } from "lucide-react";

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

/** Chronological navigation links */
const NAV_LINKS = [
  { label: "Profile", href: "#about" },
  { label: "Systems", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  // Scroll listener for dynamic glass capsule elevation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard escape listener to close mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
      }
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8"
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full px-5 backdrop-blur-2xl transition-all duration-300 ${scrolled
            ? "border border-white/15 bg-[#050505]/85 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            : "border border-white/10 bg-[#050505]/60 shadow-lg"
          }`}
      >
        {/* Brand Wordmark & Status */}
        <a
          href="#top"
          className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] text-foreground transition-opacity hover:opacity-80"
        >
          <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="font-mono text-emerald-400 font-bold">JRK //</span>
          <span className="hidden sm:inline">JAYANTH REDDY KONDA</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase font-mono tracking-[0.18em] text-muted transition-colors duration-150 hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Controls: Resume + Socials + Contact CTA */}
        <div className="flex items-center gap-2">
          {/* Download Resume Button */}
          <a
            href="/resume.pdf"
            download="Jayanth_Reddy_Konda_Resume.pdf"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 text-xs font-mono font-medium text-emerald-400 transition-all hover:border-emerald-400/60 hover:bg-emerald-400/20 hover:shadow-[0_0_12px_rgba(52,211,153,0.3)]"
          >
            <FileDown className="size-3.5" />
            <span>Resume</span>
          </a>

          {/* Social Icons */}
          <div className="hidden items-center gap-1.5 sm:flex pl-2 border-l border-white/10">
            <a
              href="https://github.com/JayanthReddyKonda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors hover:border-white/20 hover:text-foreground"
            >
              <GithubIcon className="size-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/jayanthreddykonda/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors hover:border-white/20 hover:text-foreground"
            >
              <LinkedinIcon className="size-3.5" />
            </a>
          </div>

          {/* Get in Touch CTA */}
          <a
            href="mailto:kondajayanthreddy@gmail.com"
            className="hidden sm:inline-flex h-8 items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3.5 text-xs font-medium text-foreground transition-all hover:border-white/30 hover:bg-white/20"
          >
            <span>Contact</span>
            <ArrowUpRight className="size-3" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground lg:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-lg rounded-3xl border border-white/15 bg-[#050505]/95 p-6 backdrop-blur-2xl shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm uppercase tracking-[0.18em] text-foreground/90 py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}

              <div className="flex items-center justify-between pt-3">
                <a
                  href="/resume.pdf"
                  download="Jayanth_Reddy_Konda_Resume.pdf"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400"
                >
                  <FileDown className="size-3.5" />
                  <span>Download Resume (PDF)</span>
                </a>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/JayanthReddyKonda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted hover:text-foreground"
                  >
                    GitHub
                  </a>
                  <span className="text-white/20">•</span>
                  <a
                    href="https://www.linkedin.com/in/jayanthreddykonda/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
