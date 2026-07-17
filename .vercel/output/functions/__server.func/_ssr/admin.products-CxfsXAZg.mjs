import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as collection, l as doc, n as deleteDoc, o as updateDoc, t as addDoc } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as db } from "./firebase-BBCvycKQ.mjs";
import { _ as Pen, m as Plus, p as Search, s as Trash2, t as X } from "../_libs/lucide-react.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { i as useProducts, n as useCategories } from "./useCatalog-fdXhoxOt.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as Label, t as Input } from "./label-B7oQAA24.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as formatARS } from "./cart-Dvgv3E-F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.products-CxfsXAZg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductFormModal({ product, onClose }) {
	const { data: categories = [] } = useCategories();
	const [name, setName] = (0, import_react.useState)(product?.name || "");
	const [description, setDescription] = (0, import_react.useState)(product?.description || "");
	const [price, setPrice] = (0, import_react.useState)(product?.price?.toString() || "");
	const [category, setCategory] = (0, import_react.useState)(product?.category || "");
	const [brand, setBrand] = (0, import_react.useState)(product?.brand || "");
	const [variants, setVariants] = (0, import_react.useState)(product?.variants || []);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleAddVariant = () => {
		if (variants.length >= 2) return;
		setVariants([...variants, {
			name: "",
			options: []
		}]);
	};
	const handleVariantNameChange = (index, newName) => {
		const updated = [...variants];
		updated[index].name = newName;
		setVariants(updated);
	};
	const handleRemoveVariant = (index) => {
		const updated = variants.filter((_, i) => i !== index);
		setVariants(updated);
	};
	const handleAddOption = (variantIndex, optionValue) => {
		if (!optionValue.trim()) return;
		const updated = [...variants];
		if (!updated[variantIndex].options.includes(optionValue)) {
			updated[variantIndex].options.push(optionValue.trim());
			setVariants(updated);
		}
	};
	const handleRemoveOption = (variantIndex, optionIndex) => {
		const updated = [...variants];
		updated[variantIndex].options = updated[variantIndex].options.filter((_, i) => i !== optionIndex);
		setVariants(updated);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const finalVariants = variants.filter((v) => v.name.trim() !== "" && v.options.length > 0);
		const productData = {
			name,
			description,
			price: parseFloat(price) || 0,
			category,
			brand,
			variants: finalVariants
		};
		try {
			if (product?.id) await updateDoc(doc(db, "products", product.id), productData);
			else await addDoc(collection(db, "products"), productData);
			onClose();
		} catch (error) {
			console.error("Error saving product:", error);
			alert("Hubo un error al guardar el producto.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl max-h-[90vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: product ? "Editar Producto" : "Nuevo Producto" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-6 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Nombre del Producto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									value: name,
									onChange: (e) => setName(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "price",
									children: "Precio Base (ARS)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "price",
									type: "number",
									min: "0",
									step: "0.01",
									value: price,
									onChange: (e) => setPrice(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "category",
									children: "Categoría Principal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "category",
									value: category,
									onChange: (e) => setCategory(e.target.value),
									required: true,
									className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Seleccionar categoría..."
									}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c.slug,
										children: c.name
									}, c.slug))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "brand",
									children: "Marca"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "brand",
									value: brand,
									onChange: (e) => setBrand(e.target.value),
									placeholder: "Ej: Fumaca (Opcional)"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "description",
							children: "Descripción"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "description",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							rows: 3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 rounded-xl border border-border bg-muted/20 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-foreground",
								children: "Variantes del producto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Ej: Medidas, Tamaños, Soportes. Máximo 2."
							})] }), variants.length < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: handleAddVariant,
								className: "gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Añadir Categoría de Variante"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: variants.map((variant, vIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-background p-4 relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleRemoveVariant(vIdx),
										className: "absolute right-3 top-3 text-muted-foreground hover:text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-4 pr-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 block",
											children: "Nombre (Ej: Diámetro)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: variant.name,
											onChange: (e) => handleVariantNameChange(vIdx, e.target.value),
											placeholder: "Medida, Tamaño...",
											className: "h-8 max-w-[200px]"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs uppercase tracking-widest text-muted-foreground mb-2 block",
											children: "Opciones"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2 mb-2",
											children: variant.options.map((opt, oIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1 rounded-full bg-[var(--brand)]/10 px-3 py-1 text-sm font-medium text-[var(--brand)]",
												children: [opt, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => handleRemoveOption(vIdx, oIdx),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3 hover:text-foreground" })
												})]
											}, oIdx))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "Ej: 20mm",
												className: "h-8 max-w-[150px]",
												onKeyDown: (e) => {
													if (e.key === "Enter") {
														e.preventDefault();
														handleAddOption(vIdx, e.currentTarget.value);
														e.currentTarget.value = "";
													}
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Presiona Enter para añadir"
											})]
										})
									] })
								]
							}, vIdx))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-3 pt-4 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: onClose,
							disabled: loading,
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "bg-[var(--brand)] hover:bg-[var(--brand)]/90",
							disabled: loading,
							children: loading ? "Guardando..." : "Guardar Producto"
						})]
					})
				]
			})]
		})
	});
}
function AdminProducts() {
	const { data: products = [], isLoading } = useProducts();
	const queryClient = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingProduct, setEditingProduct] = (0, import_react.useState)(null);
	const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase()));
	const handleDelete = async (id) => {
		if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
			await deleteDoc(doc(db, "products", id));
			queryClient.invalidateQueries({ queryKey: ["products"] });
		}
	};
	const handleEdit = (product) => {
		setEditingProduct(product);
		setIsModalOpen(true);
	};
	const handleCreate = () => {
		setEditingProduct(null);
		setIsModalOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold tracking-tight",
				children: "Productos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: handleCreate,
				className: "bg-[var(--brand)] hover:bg-[var(--brand)]/90 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Nuevo Producto"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-center rounded-lg border border-border bg-background px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "text",
				placeholder: "Buscar por nombre o marca...",
				value: search,
				onChange: (e) => setSearch(e.target.value),
				className: "border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
			})]
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			children: "Cargando productos..."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border border-border bg-card overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted/50 text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Producto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Categoría"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium",
								children: "Marca"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium text-right",
								children: "Precio Base"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 font-medium text-right",
								children: "Acciones"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 5,
							className: "px-6 py-8 text-center text-muted-foreground",
							children: "No se encontraron productos."
						}) }) : filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "transition-colors hover:bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-6 py-4 font-medium text-foreground",
									children: [product.name, product.variants && product.variants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [product.variants.length, " variante(s)"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 uppercase text-xs font-bold tracking-widest text-[var(--brand)]",
									children: product.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4",
									children: product.brand || "-"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-right font-semibold",
									children: formatARS(product.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleEdit(product),
											className: "rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleDelete(product.id),
											className: "rounded-lg p-2 text-destructive transition hover:bg-destructive/10",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})]
									})
								})
							]
						}, product.id))
					})]
				})
			})
		}),
		isModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductFormModal, {
			product: editingProduct,
			onClose: () => {
				setIsModalOpen(false);
				queryClient.invalidateQueries({ queryKey: ["products"] });
			}
		})
	] });
}
//#endregion
export { AdminProducts as component };
