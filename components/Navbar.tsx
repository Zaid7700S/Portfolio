"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Stack" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Path" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isPartTime, setIsPartTime] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPartTime((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isProjectsPage) return;
    function updateActiveNav() {
      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - 120;
        if (window.scrollY >= top) current = section.id;
      });
      setActiveSection(current);
    }
    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveNav);
  }, [isProjectsPage]);

  function handleMobileLinkClick() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 backdrop-blur-sm bg-[var(--bg)]/40 border-b border-[var(--border)]/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/#home"
            className="font-mono text-sm font-bold tracking-tight flex items-center gap-2"
          >
            <span className="text-[var(--accent)]">▲</span>
            <span>ZAID.A</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isProjectsPage
                  ? link.href === "/#work"
                    ? "active"
                    : ""
                  : activeSection === link.href.replace("/#", "")
                    ? "active"
                    : ""
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Animated Status Indicator */}

          <a href="/#contact"
            className="hidden md:flex items-center gap-2.5 text-xs font-mono hover:text-[var(--accent)] transition-colors group"
          >
            <div className="relative w-1.5 h-1.5">
              <div className="pulse-ring absolute inset-0" />
              <div className="absolute inset-0 rounded-full bg-[var(--accent)]" />
            </div>
            <div className="relative h-4 overflow-hidden w-52">
              <div
                id="statusTrack"
                className="flex flex-col transition-transform duration-500 ease-in-out"
                style={{
                  transform: isPartTime ? "translateY(-50%)" : "translateY(0%)",
                }}
              >
                <span className="h-4 flex items-center tracking-wider group-hover:text-[var(--accent)] transition-colors">
                  OPEN TO INTERNSHIPS
                </span>
                <span className="h-4 flex items-center tracking-wider group-hover:text-[var(--accent)] transition-colors">
                  OPEN TO PART-TIME ROLES
                </span>
              </div>
            </div>
          </a>



          <button
            id="menuBtn"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-xl w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobileMenu"
        className={`mobile-menu fixed inset-0 z-30 bg-[var(--bg)] flex flex-col items-center justify-center gap-8 text-3xl font-display ${menuOpen ? "open" : ""
          }`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={handleMobileLinkClick}
            className={`mobile-link ${isProjectsPage
                ? link.href === "/#work"
                  ? "active"
                  : ""
                : activeSection === link.href.replace("/#", "")
                  ? "active"
                  : ""
              }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-8 font-mono text-xs text-[var(--muted)] tracking-widest">
          LAHORE, PAKISTAN
        </div>
      </div>
    </>
  );
}
