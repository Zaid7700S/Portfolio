"use client";

import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  level: string;
  width: number;
}

export default function SkillBar({ name, level, width }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFilled(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-item" ref={ref}>
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-mono text-sm">{name}</span>
        <span className="font-mono text-xs text-[var(--muted)]">{level}</span>
      </div>
      <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className="skill-fill"
          style={{ width: filled ? `${width}%` : "0%" }}
        />
      </div>
    </div>
  );
}
