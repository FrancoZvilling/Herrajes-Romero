import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useProducts } from "@/hooks/useCatalog";
import { useNavigate } from "@tanstack/react-router";
import { formatARS } from "@/context/cart";

function normalizeString(str: string) {
  if (!str) return "";
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

interface SiteSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SiteSearch({ open, onOpenChange }: SiteSearchProps) {
  const { data: products = [] } = useProducts();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Filtro personalizado: ignora mayúsculas y tildes
  const normalizedSearch = normalizeString(search);
  const filteredProducts = search.trim() === "" 
    ? products.slice(0, 5) // Mostrar 5 sugerencias si está vacío
    : products.filter(p => {
        const textToSearch = `${p.name} ${p.description || ""} ${p.brand || ""}`;
        return normalizeString(textToSearch).includes(normalizedSearch);
      }).slice(0, 15); // Limitar a 15 resultados para no saturar

  const handleSelect = (productId: string) => {
    onOpenChange(false);
    navigate({
      to: "/producto/$id",
      params: { id: productId },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[600px] border-none shadow-[var(--shadow-card-hover)]">
        <Command 
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          shouldFilter={false} // Usamos nuestro propio filtro
        >
          <CommandInput 
            placeholder="Buscar productos (ej. cerradura, manija, bisagra...)" 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-[60vh] sm:max-h-[400px]">
            {filteredProducts.length === 0 ? (
              <CommandEmpty className="py-12 text-center text-muted-foreground">
                No encontramos productos con esa búsqueda.
              </CommandEmpty>
            ) : (
              <CommandGroup heading={search ? "Resultados" : "Sugerencias"}>
                {filteredProducts.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.id}
                    onSelect={() => handleSelect(product.id)}
                    className="group flex cursor-pointer items-center justify-between transition-colors hover:bg-[var(--surface-muted)]"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground">{product.name}</span>
                      {product.brand && (
                        <span className="text-xs text-muted-foreground font-semibold group-data-[selected=true]:text-white/80">
                          {product.brand}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-[var(--brand)] group-data-[selected=true]:text-white">
                      {formatARS(product.price)}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
