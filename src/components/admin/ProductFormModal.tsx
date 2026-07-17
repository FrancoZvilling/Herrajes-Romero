import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Trash2, X } from "lucide-react";
import { useCategories } from "@/hooks/useCatalog";

export function ProductFormModal({ product, onClose }: { product: any; onClose: () => void }) {
  const { data: categories = [] } = useCategories();
  
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [category, setCategory] = useState(product?.category || "");
  const [brand, setBrand] = useState(product?.brand || "");
  
  // Variants state: array of { name: "Medida", options: ["10mm", "20mm"] }
  const [variants, setVariants] = useState<{name: string; options: string[]}[]>(
    product?.variants || []
  );

  const [loading, setLoading] = useState(false);

  const handleAddVariant = () => {
    if (variants.length >= 2) return; // Limit to 2 max as per requirements
    setVariants([...variants, { name: "", options: [] }]);
  };

  const handleVariantNameChange = (index: number, newName: string) => {
    const updated = [...variants];
    updated[index].name = newName;
    setVariants(updated);
  };

  const handleRemoveVariant = (index: number) => {
    const updated = variants.filter((_, i) => i !== index);
    setVariants(updated);
  };

  const handleAddOption = (variantIndex: number, optionValue: string) => {
    if (!optionValue.trim()) return;
    const updated = [...variants];
    if (!updated[variantIndex].options.includes(optionValue)) {
      updated[variantIndex].options.push(optionValue.trim());
      setVariants(updated);
    }
  };

  const handleRemoveOption = (variantIndex: number, optionIndex: number) => {
    const updated = [...variants];
    updated[variantIndex].options = updated[variantIndex].options.filter((_, i) => i !== optionIndex);
    setVariants(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Clean up empty variants
    const finalVariants = variants.filter(v => v.name.trim() !== "" && v.options.length > 0);

    const productData = {
      name,
      description,
      price: parseFloat(price) || 0,
      category,
      brand,
      variants: finalVariants
    };

    try {
      if (product?.id) {
        await updateDoc(doc(db, "products", product.id), productData);
      } else {
        await addDoc(collection(db, "products"), productData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Hubo un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Precio Base (ARS)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría Principal</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Seleccionar categoría...</option>
                {categories.map(c => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Ej: Fumaca (Opcional)"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-4 rounded-xl border border-border bg-muted/20 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Variantes del producto</h3>
                <p className="text-xs text-muted-foreground">Ej: Medidas, Tamaños, Soportes. Máximo 2.</p>
              </div>
              {variants.length < 2 && (
                <Button type="button" variant="outline" size="sm" onClick={handleAddVariant} className="gap-2">
                  <Plus className="h-3 w-3" /> Añadir Categoría de Variante
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {variants.map((variant, vIdx) => (
                <div key={vIdx} className="rounded-lg border border-border bg-background p-4 relative">
                  <button 
                    type="button" 
                    onClick={() => handleRemoveVariant(vIdx)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  
                  <div className="mb-4 pr-8">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Nombre (Ej: Diámetro)</Label>
                    <Input 
                      value={variant.name}
                      onChange={(e) => handleVariantNameChange(vIdx, e.target.value)}
                      placeholder="Medida, Tamaño..."
                      className="h-8 max-w-[200px]"
                    />
                  </div>

                  <div>
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Opciones</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {variant.options.map((opt, oIdx) => (
                        <div key={oIdx} className="flex items-center gap-1 rounded-full bg-[var(--brand)]/10 px-3 py-1 text-sm font-medium text-[var(--brand)]">
                          {opt}
                          <button type="button" onClick={() => handleRemoveOption(vIdx, oIdx)}>
                            <X className="h-3 w-3 hover:text-foreground" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Input 
                        placeholder="Ej: 20mm" 
                        className="h-8 max-w-[150px]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddOption(vIdx, e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <span className="text-xs text-muted-foreground">Presiona Enter para añadir</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[var(--brand)] hover:bg-[var(--brand)]/90" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Producto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
