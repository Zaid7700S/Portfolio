"use client";

export default function ScrollProgress() {
  return (
    <div className="fixed top-0 left-0 right-0 h-px z-50 bg-transparent">
      <div
        id="scrollProgress"
        className="progress-bar h-full bg-[var(--accent)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
