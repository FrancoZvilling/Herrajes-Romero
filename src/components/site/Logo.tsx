import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <img 
        src="/logo.jpeg" 
        alt="Logo Casa Romero" 
        className="h-10 w-10 rounded-md object-cover shadow-[var(--shadow-brand)] transition-transform duration-300 group-hover:scale-105" 
      />
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
