export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-3 h-3">
          <div className="pulse-ring absolute inset-0" />
          <div className="absolute inset-0 rounded-full bg-[var(--accent)]" />
        </div>
        <span className="font-mono text-xs text-[var(--muted)] tracking-widest">
          LOADING
        </span>
      </div>
    </div>
  );
}