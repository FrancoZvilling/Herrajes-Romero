import { createFileRoute } from "@tanstack/react-router";
import { useCategories, useProducts } from "@/hooks/useCatalog";
import { useState } from "react";
import { Percent, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/admin/bulk-prices")({
  component: AdminBulkPrices,
});

function AdminBulkPrices() {
  const { data: categories = [] } = useCategories();
  const { data: products = [], isLoading: loadingProducts } = useProducts();
  const queryClient = useQueryClient();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [percentage, setPercentage] = useState("");
  const [isIncrease, setIsIncrease] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev => 
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    );
  };

  const handleApply = async () => {
    if (selectedCategories.length === 0) {
      alert("Selecciona al menos una categoría.");
      return;
    }
    
    const val = parseFloat(percentage);
    if (isNaN(val) || val <= 0) {
      alert("Ingresa un porcentaje válido mayor a 0.");
      return;
    }

    if (!confirm(`¿Estás seguro de que deseas aplicar un ${isIncrease ? 'aumento' : 'descuento'} del ${val}% a las categorías seleccionadas?`)) {
      return;
    }

    setLoading(true);
    setSuccess(null);

    try {
      const batch = writeBatch(db);
      let updatedCount = 0;
      
      const multiplier = isIncrease ? (1 + val / 100) : (1 - val / 100);

      const targetProducts = products.filter(p => selectedCategories.includes(p.category));

      for (const product of targetProducts) {
        const newPrice = Math.round(product.price * multiplier * 100) / 100; // Keep 2 decimal places max
        const ref = doc(db, "products", product.id);
        batch.update(ref, { price: newPrice });
        updatedCount++;
      }

      await batch.commit();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setSuccess(`Se actualizaron ${updatedCount} productos exitosamente.`);
      setPercentage("");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al actualizar los precios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="mb-8 font-display text-3xl font-bold tracking-tight">Actualización Masiva de Precios</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-display text-lg font-bold">1. Seleccionar Categorías</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {categories.map((cat) => (
                <label key={cat.slug} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition hover:bg-muted/30">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-[var(--brand)] focus:ring-[var(--brand)]"
                    checked={selectedCategories.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                  />
                  <div>
                    <span className="font-medium">{cat.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({products.filter(p => p.category === cat.slug).length} productos)
                    </span>
                  </div>
                </label>
              ))}
            </div>
            
            <div className="mt-4 flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setSelectedCategories(categories.map(c => c.slug))}>
                Seleccionar Todas
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setSelectedCategories([])}>
                Ninguna
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-display text-lg font-bold">2. Configurar Modificación</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border p-3 transition hover:bg-muted/30 has-[:checked]:border-[var(--brand)] has-[:checked]:bg-[var(--brand)]/10">
                  <input
                    type="radio"
                    name="type"
                    className="sr-only"
                    checked={isIncrease}
                    onChange={() => setIsIncrease(true)}
                  />
                  <ArrowRight className="-rotate-45 h-4 w-4 text-green-500" />
                  <span className="font-medium">Aumentar</span>
                </label>
                <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border p-3 transition hover:bg-muted/30 has-[:checked]:border-[var(--brand)] has-[:checked]:bg-[var(--brand)]/10">
                  <input
                    type="radio"
                    name="type"
                    className="sr-only"
                    checked={!isIncrease}
                    onChange={() => setIsIncrease(false)}
                  />
                  <ArrowRight className="rotate-45 h-4 w-4 text-red-500" />
                  <span className="font-medium">Descontar</span>
                </label>
              </div>

              <div className="space-y-2">
                <Label>Porcentaje (%)</Label>
                <div className="relative">
                  <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder="Ej: 15"
                    className="pl-9"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-[var(--brand)] hover:bg-[var(--brand)]/90 h-12 text-base"
            disabled={loading || loadingProducts || selectedCategories.length === 0 || !percentage}
            onClick={handleApply}
          >
            {loading ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Aplicando cambios...</>
            ) : (
              "Aplicar Modificación"
            )}
          </Button>

          {success && (
            <div className="flex items-center gap-2 rounded-lg bg-green-500/15 p-4 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
