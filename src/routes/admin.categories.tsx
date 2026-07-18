import { createFileRoute } from "@tanstack/react-router";
import { useCategories } from "@/hooks/useCatalog";
import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const { data: categories = [], isLoading } = useCategories();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleDelete = async (slug: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta categoría? Si tiene productos, quedarán huérfanos.")) {
      await deleteDoc(doc(db, "categories", slug));
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight">Categorías</h1>
        <Button onClick={handleCreate} className="bg-[var(--brand)] hover:bg-[var(--brand)]/90 gap-2">
          <Plus className="h-4 w-4" />
          Nueva Categoría
        </Button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Cargando categorías...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.slug} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">{cat.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(cat)} className="text-muted-foreground hover:text-foreground">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(cat.slug)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{cat.description}</p>
              <div className="mt-4 text-xs font-mono bg-muted/50 rounded-md px-2 py-1 inline-block text-muted-foreground">
                slug: {cat.slug}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <CategoryFormModal 
          category={editingCategory} 
          onClose={() => {
            setIsModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ["categories"] });
          }} 
        />
      )}
    </div>
  );
}

function CategoryFormModal({ category, onClose }: { category: any; onClose: () => void }) {
  const [name, setName] = useState(category?.name || "");
  const [slug, setSlug] = useState(category?.slug || "");
  const [description, setDescription] = useState(category?.description || "");
  const [subcategories, setSubcategories] = useState<string[]>(category?.subcategories || []);
  const [newSub, setNewSub] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddSub = () => {
    const trimmed = newSub.trim();
    if (trimmed && !subcategories.includes(trimmed)) {
      setSubcategories([...subcategories, trimmed]);
      setNewSub("");
    }
  };

  const handleRemoveSub = (sub: string) => {
    setSubcategories(subcategories.filter((s) => s !== sub));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Auto-generate slug if new
    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      await setDoc(doc(db, "categories", finalSlug), {
        name,
        slug: finalSlug,
        description,
        subcategories
      });
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error al guardar categoría");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Editar Categoría" : "Nueva Categoría"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Identificador (Slug)</Label>
            <Input 
              id="slug" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)} 
              placeholder="Ej: manijas-picaportes"
              disabled={!!category} // Don't allow changing slug of existing category to avoid orphans
            />
            {!category && <p className="text-xs text-muted-foreground">Si lo dejas vacío, se generará automáticamente a partir del nombre.</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required />
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
            <Label>Subcategorías</Label>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((sub) => (
                <div key={sub} className="flex items-center gap-1 rounded-full bg-[var(--brand)]/10 px-3 py-1 text-sm font-medium text-[var(--brand)]">
                  {sub}
                  <button type="button" onClick={() => handleRemoveSub(sub)} className="ml-1 hover:text-red-500">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {subcategories.length === 0 && (
                <span className="text-sm text-muted-foreground">No hay subcategorías agregadas.</span>
              )}
            </div>
            <div className="flex gap-2">
              <Input 
                value={newSub} 
                onChange={(e) => setNewSub(e.target.value)} 
                placeholder="Ej: Enchufes" 
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSub();
                  }
                }}
              />
              <Button type="button" variant="secondary" onClick={handleAddSub}>
                Agregar
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancelar</Button>
            <Button type="submit" className="bg-[var(--brand)] hover:bg-[var(--brand)]/90" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Categoría"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
