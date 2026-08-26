import Link from "next/link";
import { LabelSlideButton } from "@/components/core/LabelSlideButton";

export default function NotFound() {
    return (
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
            <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-[#2d5a4a]/30 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl">
                {/* Status Eyebrow */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#7ba05b]/30 bg-[#1b4b3e]/60 px-3.5 py-1 font-mono text-xs uppercase tracking-[0.25em] text-[#7ba05b]">
                    <span className="size-1.5 rounded-full bg-[#7ba05b] animate-ping" />
                    <span>404 // NODE NOT FOUND</span>
                </div>

                {/* Heading */}
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#f4f1eb] sm:text-5xl">
                    Signal Lost.
                </h1>

                {/* Narrative */}
                <p className="mt-4 font-mono text-sm leading-relaxed text-[#f4f1eb]/70 sm:text-base">
                    The requested coordinate or transmission line does not exist in the system matrix. Return to the main command deck.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <LabelSlideButton
                        href="/"
                        label="Return to Overview"
                        variant="accent"
                        size="md"
                    />

                    <LabelSlideButton
                        href="/work"
                        label="View Projects"
                        variant="secondary"
                        size="md"
                    />
                </div>

                {/* Quick Route Bar */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs font-mono uppercase tracking-wider text-[#f4f1eb]/60">
                    <Link href="/about" className="hover:text-[#7ba05b] transition-colors">
                        About
                    </Link>
                    <span>•</span>
                    <Link href="/experience" className="hover:text-[#7ba05b] transition-colors">
                        Experience
                    </Link>
                    <span>•</span>
                    <Link href="/skills" className="hover:text-[#7ba05b] transition-colors">
                        Skills Lab
                    </Link>
                    <span>•</span>
                    <Link href="/contact" className="hover:text-[#7ba05b] transition-colors">
                        Contact
                    </Link>
                </div>
            </div>
        </main>
    );
}

