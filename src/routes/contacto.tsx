import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Casa Romero Herrajes" },
      { name: "description", content: "Rivadavia 426, Córdoba. Tel 351-4216433 · WhatsApp 3517010095. Lun-Vie 9-17, Sáb 9-13." },
      { property: "og:title", content: "Contacto — Casa Romero" },
      { property: "og:description", content: "Estamos en Rivadavia 426, Córdoba capital." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="border-b border-border bg-[var(--surface)] py-16">
        <div className="container-x">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)]">Contacto</p>
          <h1 className="mt-2 font-display text-5xl font-bold tracking-tight">Hablemos</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Escribinos, llamanos o visitanos en nuestra sucursal. Estamos para asesorarte.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-8 py-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <Card icon={<MapPin />} title="Dirección" primary="Rivadavia 426" secondary="CP 5000 — Córdoba capital" />
          <Card icon={<Phone />} title="Teléfono" primary="351-4216433" href="tel:3514216433" />
          <Card icon={<MessageCircle />} title="WhatsApp" primary="3517010095" href="https://wa.me/5493517010095" />
          <Card icon={<Clock />} title="Horarios" primary="Lunes a Viernes 09:00 – 17:00" secondary="Sábados 09:00 – 13:00" />
          <div className="flex gap-2 pt-2">
            <a href="https://www.instagram.com/casaromeroherrajes" target="_blank" rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border transition hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.facebook.com/share/14ffRKMyEjW/" target="_blank" rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border transition hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Casa Romero Herrajes — Ubicación"
            src="https://www.google.com/maps?q=Rivadavia+426,+C%C3%B3rdoba,+Argentina&output=embed"
            className="h-full min-h-[420px] w-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}

function Card({
  icon, title, primary, secondary, href,
}: { icon: React.ReactNode; title: string; primary: string; secondary?: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 card-hover">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]">
        {icon}
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</div>
        <div className="mt-1 font-display text-lg font-semibold text-foreground">{primary}</div>
        {secondary && <div className="text-sm text-muted-foreground">{secondary}</div>}
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer" className="block">{content}</a> : content;
}
