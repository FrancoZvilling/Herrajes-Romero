import { createFileRoute } from "@tanstack/react-router";
import { useBrands } from "@/hooks/useCatalog";

export const Route = createFileRoute("/marcas")({
  head: () => ({
    meta: [
      { title: "Marcas — Casa Romero Herrajes" },
      { name: "description", content: "Trabajamos con marcas líderes: Fumaca, Prive, Kallay, Simeplast, Bronzen, MR, FC Metalúrgica, Currao, Alce, Sidañez y Sica." },
      { property: "og:title", content: "Marcas — Casa Romero" },
      { property: "og:description", content: "Marcas de primer nivel para tus proyectos." },
    ],
  }),
  component: Brands,
});

function Brands() {
  const { data: brands = [] } = useBrands();
  return (
    <section className="container-x py-20">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)]">Con quiénes trabajamos</p>
        <h1 className="mt-2 font-display text-5xl font-bold tracking-tight">Marcas líderes</h1>
        <p className="mt-4 text-muted-foreground">
          Elegimos cuidadosamente cada marca de nuestro catálogo. Priorizamos la
          calidad, la disponibilidad y el respaldo de fábrica.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {brands.map((b) => (
          <div
            key={b}
            className="group flex aspect-[3/2] flex-col items-center justify-center rounded-xl border border-border bg-card p-6 card-hover"
          >
            <span className="font-display text-2xl font-bold text-foreground/80 transition-colors group-hover:text-[var(--brand)]">
              {b}
            </span>
            <span className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              Marca oficial
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
