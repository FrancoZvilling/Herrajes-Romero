import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-[var(--brand)] shadow-[var(--shadow-brand)] transition-transform duration-300 group-hover:scale-105">
        <span className="font-display text-lg font-bold text-white">CR</span>
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight text-foreground">
          Casa Romero
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Herrajes · 60 años
        </span>
      </span>
    </Link>
  );
}
