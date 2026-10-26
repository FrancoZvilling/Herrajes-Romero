import { createFileRoute } from "@tanstack/react-router";
import { useProducts, useCategories } from "@/hooks/useCatalog";
import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Star, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { useQueryClient } from "@tanstack/react-query";
import { exportCatalogToExcel } from "@/lib/exportCatalogExcel";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (products.length === 0) {
      alert("No hay productos en el catálogo para exportar.");
      return;
    }
    try {
      setIsExporting(true);
      await exportCatalogToExcel(products, categories);
    } catch (error) {
      console.error("Error exportando a Excel:", error);
      alert("Hubo un error al generar el archivo Excel.");
    } finally {
      setIsExporting(false);
    }
  };

  const filteredProducts = products.filter((p) => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      await deleteDoc(doc(db, "products", id));
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  const handleToggleFeatured = async (product: any) => {
    const currentlyFeatured = products.filter((p) => p.featured).length;
    
    if (!product.featured && currentlyFeatured >= 8) {
      alert("No puedes destacar más de 8 productos. Por favor, desmarca alguno primero.");
      return;
    }

    try {
      await updateDoc(doc(db, "products", product.id), {
        featured: !product.featured
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.error("Error toggling featured status:", error);
      alert("Hubo un error al intentar destacar el producto.");
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Productos</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {products.length} productos registrados en el catálogo
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleExport}
            disabled={isExporting || isLoading}
            variant="outline"
            className="border-emerald-600/30 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 gap-2 font-semibold shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            {isExporting ? "Generando Excel..." : "Exportar Catálogo a Excel"}
          </Button>

          <Button onClick={handleCreate} className="bg-[var(--brand)] hover:bg-[var(--brand)]/90 gap-2 font-semibold shadow-sm cursor-pointer">
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      <div className="mb-6 flex items-center rounded-lg border border-border bg-background px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar por nombre o marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Cargando productos...</div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Producto</th>
                  <th className="px-6 py-4 font-medium">Categoría</th>
                  <th className="px-6 py-4 font-medium">Marca</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      No se encontraron productos.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="transition-colors hover:bg-muted/30">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {product.name}
                        {product.variants && product.variants.length > 0 && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            {product.variants.map((v: any) => v.name).join(", ")}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 uppercase text-xs font-bold tracking-widest text-[var(--brand)]">
                        {product.category}
                      </td>
                      <td className="px-6 py-4">{product.brand || "-"}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleFeatured(product)}
                            className={`rounded-lg p-2 transition ${
                              product.featured
                                ? "text-yellow-500 hover:bg-yellow-500/10"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                            title={product.featured ? "Quitar de destacados" : "Agregar a destacados"}
                          >
                            <Star className="h-4 w-4" fill={product.featured ? "currentColor" : "none"} />
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="rounded-lg p-2 text-destructive transition hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <ProductFormModal 
          product={editingProduct} 
          onClose={() => {
            setIsModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ["products"] });
          }} 
        />
      )}
    </div>
  );
}
