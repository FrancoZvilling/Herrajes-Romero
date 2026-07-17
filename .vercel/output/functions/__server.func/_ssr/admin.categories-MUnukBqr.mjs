import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as setDoc, l as doc, n as deleteDoc } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as db } from "./firebase-BBCvycKQ.mjs";
import { _ as Pen, m as Plus, s as Trash2 } from "../_libs/lucide-react.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as useCategories } from "./useCatalog-fdXhoxOt.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as Label, t as Input } from "./label-B7oQAA24.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.categories-MUnukBqr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminCategories() {
	const { data: categories = [], isLoading } = useCategories();
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const handleDelete = async (slug) => {
		if (confirm("¿Estás seguro de que deseas eliminar esta categoría? Si tiene productos, quedarán huérfanos.")) {
			await deleteDoc(doc(db, "categories", slug));
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		}
	};
	const handleEdit = (category) => {
		setEditingCategory(category);
		setIsModalOpen(true);
	};
	const handleCreate = () => {
		setEditingCategory(null);
		setIsModalOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold tracking-tight",
				children: "Categorías"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: handleCreate,
				className: "bg-[var(--brand)] hover:bg-[var(--brand)]/90 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Nueva Categoría"]
			})]
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			children: "Cargando categorías..."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-6 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-bold",
							children: cat.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleEdit(cat),
								className: "text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDelete(cat.slug),
								className: "text-muted-foreground hover:text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground line-clamp-2",
						children: cat.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 text-xs font-mono bg-muted/50 rounded-md px-2 py-1 inline-block text-muted-foreground",
						children: ["slug: ", cat.slug]
					})
				]
			}, cat.slug))
		}),
		isModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryFormModal, {
			category: editingCategory,
			onClose: () => {
				setIsModalOpen(false);
				queryClient.invalidateQueries({ queryKey: ["categories"] });
			}
		})
	] });
}
function CategoryFormModal({ category, onClose }) {
	const [name, setName] = (0, import_react.useState)(category?.name || "");
	const [slug, setSlug] = (0, import_react.useState)(category?.slug || "");
	const [description, setDescription] = (0, import_react.useState)(category?.description || "");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
		try {
			await setDoc(doc(db, "categories", finalSlug), {
				name,
				slug: finalSlug,
				description
			});
			onClose();
		} catch (error) {
			console.error(error);
			alert("Error al guardar categoría");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: category ? "Editar Categoría" : "Nueva Categoría" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-4 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "name",
						children: "Nombre"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "name",
						value: name,
						onChange: (e) => setName(e.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "slug",
							children: "Identificador (Slug)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "slug",
							value: slug,
							onChange: (e) => setSlug(e.target.value),
							placeholder: "Ej: manijas-picaportes",
							disabled: !!category
						}),
						!category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Si lo dejas vacío, se generará automáticamente a partir del nombre."
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
						rows: 3,
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-3 pt-4",
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
						children: loading ? "Guardando..." : "Guardar Categoría"
					})]
				})
			]
		})] })
	});
}
//#endregion
export { AdminCategories as component };
