"use client";

/**
 * @file Navbar.tsx
 * @description Fixed Floating Glass Capsule Navigation Bar in Emerald Sophistication.
 * 
 * Features:
 * - Brand Logo: JRK in sleek oval LabelSlideButton.
 * - View Transitions API integration (`document.startViewTransition`) for fluid 60fps page morphs.
 * - Glassmorphism surface styling with Emerald active indicators.
 * - Mobile animated drawer with instant navigation.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LabelSlideButton } from "./LabelSlideButton";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Overview", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/work" },
  { label: "Gallery", href: "/gallery" },
  { label: "Experience", href: "/experience" },
  { label: "Skills Lab", href: "/skills" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) return;
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      e.preventDefault();
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        router.push(href);
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-8 sm:py-4 transition-all duration-300 pointer-events-auto"
    >
      <nav
        aria-label="Primary Navigation"
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-[#7ba05b]/25 bg-[#0d4c3c]/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "border-white/10 bg-[#0d4c3c]/60 backdrop-blur-md"
        }`}
      >
        {/* Brand / Logo: JRK in LabelSlideButton */}
        <LabelSlideButton
          href="/"
          label="JRK"
          variant="secondary"
          size="sm"
          addIcon={false}
          className="rounded-full px-3.5 py-1 font-mono text-xs font-bold tracking-widest text-[#7ba05b] border border-[#7ba05b]/40 hover:border-[#7ba05b]"
        />

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={`relative px-3 py-1.5 text-xs uppercase font-mono tracking-[0.18em] transition-colors duration-200 ${
                  active
                    ? "text-[#7ba05b] font-bold"
                    : "text-[#f4f1eb]/70 hover:text-[#f4f1eb]"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-[#7ba05b] shadow-[0_0_8px_#7ba05b]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Controls: Resume + Socials + Contact CTA */}
        <div className="flex items-center gap-2">
          {/* Download Resume Button */}
          <a
            href="/resume.pdf"
            download="Jayanth_Reddy_Konda_Resume.pdf"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#7ba05b]/30 bg-[#2d5a4a]/40 px-3 text-xs font-mono font-medium text-[#f4f1eb] transition-all hover:border-[#7ba05b] hover:bg-[#7ba05b]/20 hover:text-[#7ba05b]"
          >
            <DownloadIcon className="size-3.5 text-[#7ba05b]" />
            <span className="hidden sm:inline">Resume</span>
          </a>

          {/* Social Icons */}
          <div className="hidden items-center gap-1.5 sm:flex pl-2 border-l border-white/10">
            <a
              href="https://github.com/JayanthReddyKonda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f4f1eb]/70 transition-colors hover:border-[#7ba05b]/50 hover:text-[#f4f1eb]"
            >
              <GithubIcon className="size-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/jayanthreddykonda/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f4f1eb]/70 transition-colors hover:border-[#7ba05b]/50 hover:text-[#f4f1eb]"
            >
              <LinkedinIcon className="size-3.5" />
            </a>
          </div>

          {/* Get in Touch CTA */}
          <LabelSlideButton
            href="/contact"
            label="Contact"
            variant="accent"
            size="sm"
            className="hidden sm:inline-flex"
          />

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f4f1eb] lg:hidden cursor-pointer"
          >
            {menuOpen ? <CloseIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-sm rounded-3xl border border-[#7ba05b]/25 bg-[#0d4c3c]/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-2 font-mono">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      setMenuOpen(false);
                      handleNavigation(e, link.href);
                    }}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs uppercase tracking-wider transition-colors ${
                      active
                        ? "bg-[#7ba05b]/20 font-bold text-[#7ba05b]"
                        : "text-[#f4f1eb]/80 hover:bg-white/5 hover:text-[#f4f1eb]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="size-1.5 rounded-full bg-[#7ba05b]" />}
                  </Link>
                );
              })}

              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                <LabelSlideButton
                  href="/contact"
                  label="Initiate Contact"
                  variant="accent"
                  size="md"
                  onClick={() => setMenuOpen(false)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
