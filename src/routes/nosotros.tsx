import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — Casa Romero Herrajes" },
      { name: "description", content: "Somos un negocio familiar con más de 60 años de trayectoria en el rubro de herrajes en Córdoba." },
      { property: "og:title", content: "Nosotros — Casa Romero" },
      { property: "og:description", content: "60 años de compromiso con la calidad, el asesoramiento y la buena atención." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--ink)] py-24 text-white">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-[var(--brand)] opacity-20 blur-3xl" />
        <div className="container-x relative">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)]">Nuestra historia</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl">
            60 años haciendo lo que
            <span className="text-[var(--brand)]"> más nos gusta</span>.
          </h1>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/80">
          <p>
            Somos un <strong>negocio familiar con más de 60 años de trayectoria</strong> en el
            rubro de herrajes. Desde nuestros comienzos, nos distingue el compromiso con la
            calidad, el asesoramiento y, sobre todo, la buena atención a cada cliente.
          </p>
          <p>
            Trabajamos con productos de primeras marcas y ponemos nuestra experiencia al
            servicio de quienes nos eligen, brindando un <strong>trato cercano, confianza y
            soluciones para cada proyecto</strong>.
          </p>
        </div>

        <div className="space-y-4">
          <Pillar icon={<Heart />} title="Familiares" text="Tres generaciones detrás del mostrador." />
          <Pillar icon={<Award />} title="Primeras marcas" text="Solo productos que probamos y respaldamos." />
          <Pillar icon={<Users />} title="Cerca del cliente" text="Cada consulta merece una respuesta real." />
        </div>
      </section>
    </>
  );
}

function Pillar({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5 card-hover">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]">
        {icon}
      </div>
      <div>
        <h3 className="font-display font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
