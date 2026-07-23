import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Plus, Trash2, X, Upload, Image as ImageIcon } from "lucide-react";
import { useCategories } from "@/hooks/useCatalog";

export function ProductFormModal({ product, onClose }: { product: any; onClose: () => void }) {
  const { data: categories = [] } = useCategories();
  
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [category, setCategory] = useState(product?.category || "");
  const [subcategory, setSubcategory] = useState(product?.subcategory || "");
  const [brand, setBrand] = useState(product?.brand || "");
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product?.imageUrl || "");

  // Variants state: array of { name: "Medida", options: { value: "10mm", price?: number }[] }
  const [variants, setVariants] = useState<{name: string; options: {value: string, price?: number}[]}[]>(
    product?.variants || []
  );

  const [loading, setLoading] = useState(false);

  const selectedCategoryObj = categories.find((c: any) => c.slug === category);
  const availableSubcategories = selectedCategoryObj?.subcategories || [];

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
    if (!updated[variantIndex].options.find(o => o.value === optionValue)) {
      updated[variantIndex].options.push({ value: optionValue.trim() });
      setVariants(updated);
    }
  };

  const handleRemoveOption = (variantIndex: number, optionIndex: number) => {
    const updated = [...variants];
    updated[variantIndex].options = updated[variantIndex].options.filter((_, i) => i !== optionIndex);
    setVariants(updated);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Clean up empty variants
    const finalVariants = variants.filter(v => v.name.trim() !== "" && v.options.length > 0);

    try {
      let uploadedImageUrl = product?.imageUrl || null;

      if (imageFile) {
        const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        uploadedImageUrl = await getDownloadURL(imageRef);
      }

      const productData = {
        name,
        description,
        price: parseFloat(price) || 0,
        category,
        subcategory: subcategory || null,
        brand,
        imageUrl: uploadedImageUrl,
        variants: finalVariants
      };

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
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory(""); // Reset subcategory when category changes
                }}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Seleccionar categoría...</option>
                {categories.map(c => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {availableSubcategories.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategoría (Opcional)</Label>
                <select
                  id="subcategory"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Ninguna...</option>
                  {availableSubcategories.map((sub: string) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}

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

          <div className="space-y-4 rounded-xl border border-border bg-muted/20 p-5">
            <h3 className="font-semibold text-foreground">Imagen del Producto</h3>
            <div className="flex items-start gap-4">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-background">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="image" className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[var(--brand)]/90">
                  <Upload className="h-4 w-4" />
                  {imagePreview ? "Cambiar Imagen" : "Subir Imagen"}
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <p className="text-xs text-muted-foreground">
                  Recomendado: Imagen cuadrada (1:1) en formato JPG o PNG. Tamaño máximo 2MB.
                </p>
              </div>
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
                    <div className="flex flex-col gap-3 mb-4">
                      {variant.options.map((opt, oIdx) => (
                        <div key={oIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg bg-[var(--surface-muted)] p-3">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{opt.value}</span>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={opt.price === undefined || opt.price === null}
                                onChange={(e) => {
                                  const updated = [...variants];
                                  if (e.target.checked) {
                                    delete updated[vIdx].options[oIdx].price;
                                  } else {
                                    updated[vIdx].options[oIdx].price = parseFloat(price) || 0;
                                  }
                                  setVariants(updated);
                                }}
                                className="rounded border-input text-[var(--brand)] focus:ring-[var(--brand)] h-4 w-4"
                              />
                              Mismo precio que base
                            </label>
                            
                            {opt.price !== undefined && opt.price !== null && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">$</span>
                                <Input 
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={opt.price}
                                  onChange={(e) => {
                                    const updated = [...variants];
                                    updated[vIdx].options[oIdx].price = parseFloat(e.target.value) || 0;
                                    setVariants(updated);
                                  }}
                                  className="h-8 w-24 bg-background"
                                />
                              </div>
                            )}

                            <button type="button" onClick={() => handleRemoveOption(vIdx, oIdx)} className="text-muted-foreground hover:text-destructive p-1">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Input 
                        placeholder="Ej: 20mm" 
                        className="h-8 max-w-[200px]"
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
