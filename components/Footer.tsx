"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isSubPage = pathname !== "/";

  if (isSubPage) {
    return (
      <footer className="relative border-t border-[var(--border)] px-6 md:px-12 py-8 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[var(--muted)]">
          <div className="flex items-center gap-3">
            <span className="text-[var(--accent)]">▲</span>
            <span>© 2024 ZAID ARSHAD · BUILT WITH CARE IN LAHORE</span>
          </div>
          <div className="flex items-center gap-4">
            <span>v1.0.0</span>
            <span className="text-[var(--border-hi)]">·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-[var(--accent)] transition-colors flex items-center gap-2"
            >
              BACK TO TOP <i className="fas fa-arrow-up" />
            </button>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative border-t border-[var(--border)] px-6 md:px-12 py-8 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[var(--muted)]">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)]">▲</span>
          <span>© 2026 ZAID ARSHAD · BUILT WITH CARE IN LAHORE</span>
        </div>
        <div className="flex items-center gap-4">
          <span>v1.0.0</span>
          <span className="text-[var(--border-hi)]">·</span>
          <Link
            href="/#home"
            className="hover:text-[var(--accent)] transition-colors flex items-center gap-2"
          >
            BACK TO TOP <i className="fas fa-arrow-up" />
          </Link>
        </div>
      </div>
    </footer>
  );
}