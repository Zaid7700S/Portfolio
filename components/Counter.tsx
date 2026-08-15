"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  target: number;
  suffix?: string;
}

export default function Counter({ target, suffix = "" }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            const isDecimal = target % 1 !== 0;
            const duration = 1800;
            const start = performance.now();

            function update(now: number) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 4);
              const current = target * eased;
              setValue(isDecimal ? Number(current.toFixed(1)) : Math.floor(current));
              if (progress < 1) requestAnimationFrame(update);
              else setValue(target);
            }
            requestAnimationFrame(update);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      className="counter font-mono text-5xl md:text-6xl font-bold text-[var(--accent)] leading-none"
    >
      {value}
      {suffix}
    </div>
  );
}
