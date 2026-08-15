"use client";

import { useEffect } from "react";

export default function GlobalEffects() {
  // Magnetic buttons + tilt cards via event delegation
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const target = e.target as HTMLElement;

      const magnetic = target.closest<HTMLElement>(".magnetic");
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        magnetic.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      }

      const tilt = target.closest<HTMLElement>(".tilt-card");
      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -7;
        const ry = ((x - cx) / cx) * 7;
        tilt.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      }
    }

    function onOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      const magnetic = target.closest?.<HTMLElement>(".magnetic");
      if (magnetic && !magnetic.contains(related)) {
        magnetic.style.transform = "translate(0, 0)";
      }
      const tilt = target.closest?.<HTMLElement>(".tilt-card");
      if (tilt && !tilt.contains(related)) {
        tilt.style.transform =
          "perspective(1200px) rotateX(0) rotateY(0) translateZ(0)";
      }
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  // Reveal-on-scroll
 // Reveal-on-scroll
useEffect(() => {
  const els = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
  );
  els.forEach((el) => observer.observe(el));

  // Safety net: if the page is too short (or already at max scroll) for
  // some elements to ever cross the shrunk rootMargin threshold, force
  // reveal anything still hidden once the user nears the bottom.
  function revealNearBottom() {
    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 40;
    if (nearBottom) {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
        el.classList.add("visible");
        observer.unobserve(el);
      });
    }
  }
  revealNearBottom();
  window.addEventListener("scroll", revealNearBottom, { passive: true });
  window.addEventListener("resize", revealNearBottom);

  return () => {
    observer.disconnect();
    window.removeEventListener("scroll", revealNearBottom);
    window.removeEventListener("resize", revealNearBottom);
  };
}, []);

  // Scroll progress bar
  useEffect(() => {
    const progressBar = document.getElementById("scrollProgress");
    function updateScroll() {
      const progress =
        window.scrollY /
        Math.max(1, document.body.scrollHeight - window.innerHeight);
      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }
    }
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return null;
}
