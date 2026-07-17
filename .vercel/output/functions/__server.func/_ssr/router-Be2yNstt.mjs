import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Logo } from "./Logo-BXzxn3NU.mjs";
import { A as Clock, E as Instagram, O as Facebook, S as MapPin, b as MessageCircle, d as ShoppingBag, h as Phone, m as Plus, p as Search, s as Trash2, t as X, x as Menu, y as Minus } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as useCategories, t as useBrands } from "./useCatalog-fdXhoxOt.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as formatARS, r as useCart, t as CartProvider } from "./cart-Dvgv3E-F.mjs";
import { t as Route$14 } from "./categoria._slug-Dya--yJ1.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { t as Route$15 } from "./producto._id-Bm3olNw3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Be2yNstt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-8AHVHyvO.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function Header() {
	const { count, setOpen } = useCart();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [catOpen, setCatOpen] = (0, import_react.useState)(false);
	const { data: categories = [] } = useCategories();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden bg-[var(--ink)] text-white lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-x flex h-9 items-center justify-between text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-white/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5 text-[var(--brand)]" }), "351-4216433 · WhatsApp 3517010095"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white/70",
						children: "Rivadavia 426 · Córdoba · Lun-Vie 9-17 · Sáb 9-13"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x flex h-16 items-center gap-4 lg:h-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "ml-6 hidden items-center gap-1 lg:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								onMouseEnter: () => setCatOpen(true),
								onMouseLeave: () => setCatOpen(false),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-[var(--surface-muted)] hover:text-foreground",
									children: ["Catálogo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 rounded bg-[var(--brand)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--brand)]",
										children: categories.length
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: catOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: 8
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: {
										opacity: 0,
										y: 4
									},
									transition: { duration: .15 },
									className: "absolute left-0 top-full z-50 w-[720px] pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-3 gap-1 rounded-xl border border-border bg-popover p-3 shadow-[var(--shadow-card-hover)]",
										children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/categoria/$slug",
											params: { slug: c.slug },
											className: "group flex flex-col rounded-lg px-3 py-2 transition hover:bg-[var(--surface-muted)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-semibold text-foreground group-hover:text-[var(--brand)]",
												children: c.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "line-clamp-1 text-xs text-muted-foreground",
												children: c.description
											})]
										}, c.slug))
									})
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: "/marcas",
								children: "Marcas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: "/nosotros",
								children: "Nosotros"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: "/contacto",
								children: "Contacto"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "Buscar",
								className: "hidden h-10 w-10 items-center justify-center rounded-md text-foreground/70 transition hover:bg-[var(--surface-muted)] hover:text-foreground md:inline-flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setOpen(true),
								"aria-label": "Carrito",
								className: "relative inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 transition hover:bg-[var(--surface-muted)] hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									initial: {
										scale: .4,
										opacity: 0
									},
									animate: {
										scale: 1,
										opacity: 1
									},
									exit: {
										scale: .4,
										opacity: 0
									},
									className: "absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--brand)] px-1 text-[11px] font-bold text-white shadow-[var(--shadow-brand)]",
									children: count
								}, count) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "ml-1 hidden bg-[var(--brand)] text-white hover:bg-[var(--brand)]/90 lg:inline-flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://wa.me/5493517010095",
									target: "_blank",
									rel: "noreferrer",
									children: "WhatsApp"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 hover:bg-[var(--surface-muted)] lg:hidden",
								onClick: () => setMobileOpen((v) => !v),
								"aria-label": "Menú",
								children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					height: 0,
					opacity: 0
				},
				animate: {
					height: "auto",
					opacity: 1
				},
				exit: {
					height: 0,
					opacity: 0
				},
				className: "overflow-hidden border-t border-border bg-background lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-x flex flex-col gap-1 py-3",
					children: [
						categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categoria/$slug",
							params: { slug: c.slug },
							onClick: () => setMobileOpen(false),
							className: "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-[var(--surface-muted)]",
							children: c.name
						}, c.slug)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-2 h-px bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/nosotros",
							onClick: () => setMobileOpen(false),
							className: "rounded-md px-3 py-2 text-sm",
							children: "Nosotros"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/marcas",
							onClick: () => setMobileOpen(false),
							className: "rounded-md px-3 py-2 text-sm",
							children: "Marcas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contacto",
							onClick: () => setMobileOpen(false),
							className: "rounded-md px-3 py-2 text-sm",
							children: "Contacto"
						})
					]
				})
			}) })
		]
	});
}
function NavLink({ to, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		activeProps: { className: "text-foreground bg-[var(--surface-muted)]" },
		className: "rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition hover:bg-[var(--surface-muted)] hover:text-foreground",
		children
	});
}
function Footer() {
	const { data: categories = [] } = useCategories();
	const { data: brands = [] } = useBrands();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border bg-[var(--ink)] text-white/85",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "[&_span]:!text-white [&_.text-muted-foreground]:!text-white/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xs text-sm text-white/60",
						children: "Más de 60 años de experiencia en herrajes. Calidad, asesoramiento y atención cercana en cada proyecto."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.instagram.com/casaromeroherrajes",
								target: "_blank",
								rel: "noreferrer",
								className: "flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white",
								"aria-label": "Instagram",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.facebook.com/share/14ffRKMyEjW/",
								target: "_blank",
								rel: "noreferrer",
								className: "flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white",
								"aria-label": "Facebook",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://wa.me/5493517010095",
								target: "_blank",
								rel: "noreferrer",
								className: "flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white",
								"aria-label": "WhatsApp",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" })
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-4 text-xs font-bold uppercase tracking-widest text-[var(--brand)]",
					children: "Catálogo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm",
					children: categories.slice(0, 6).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/categoria/$slug",
						params: { slug: c.slug },
						className: "text-white/70 transition hover:text-white",
						children: c.name
					}) }, c.slug))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-4 text-xs font-bold uppercase tracking-widest text-[var(--brand)]",
					children: "Marcas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: brands.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70",
						children: b
					}, b))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-4 text-xs font-bold uppercase tracking-widest text-[var(--brand)]",
					children: "Visitanos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3 text-sm text-white/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" }), "Rivadavia 426 · CP 5000 · Córdoba"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" }), "351-4216433"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" }), "WhatsApp 3517010095"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" }), "Lun-Vie 9-17 · Sáb 9-13"]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 md:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Casa Romero Herrajes · Todos los derechos reservados."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white/40",
						children: "Aceptamos:"
					}), [
						"VISA",
						"MasterCard",
						"Naranja",
						"Mercado Pago"
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded border border-white/10 bg-white/5 px-2 py-1 font-semibold text-white/70",
						children: m
					}, m))]
				})]
			})
		})]
	});
}
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function CartDrawer() {
	const { isOpen, setOpen, items, remove, updateQty, total, clear } = useCart();
	encodeURIComponent("Hola Casa Romero! Me interesa este pedido:\n\n" + items.map((i) => `• ${i.name} (${i.variantLabel || "-"}) x${i.qty} — ${formatARS(i.price * i.qty)}`).join("\n") + `\n\nTotal: ${formatARS(total)}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: isOpen,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "flex w-full flex-col gap-0 sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "border-b border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5 text-[var(--brand)]" }), "Tu carrito"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto p-4",
					children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col items-center justify-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-muted)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-7 w-7 text-muted-foreground" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg font-semibold",
								children: "Tu carrito está vacío"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Explorá el catálogo y sumá productos."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							initial: false,
							children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								layout: true,
								initial: {
									opacity: 0,
									x: 20
								},
								animate: {
									opacity: 1,
									x: 0
								},
								exit: {
									opacity: 0,
									x: 20
								},
								className: "rounded-lg border border-border bg-card p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate font-semibold text-foreground",
												children: i.name
											}),
											i.variantLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-0.5 text-xs text-muted-foreground",
												children: i.variantLabel
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm font-bold text-[var(--brand)]",
												children: formatARS(i.price * i.qty)
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => remove(i.productId, i.variantKey),
										className: "rounded p-1 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive",
										"aria-label": "Eliminar",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 inline-flex items-center rounded-md border border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateQty(i.productId, i.variantKey, i.qty - 1),
											className: "flex h-8 w-8 items-center justify-center transition hover:bg-[var(--surface-muted)]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-8 text-center text-sm font-semibold",
											children: i.qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateQty(i.productId, i.variantKey, i.qty + 1),
											className: "flex h-8 w-8 items-center justify-center transition hover:bg-[var(--surface-muted)]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
										})
									]
								})]
							}, i.productId + i.variantKey))
						})
					})
				}),
				items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border bg-[var(--surface)] p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "Total estimado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl font-bold text-foreground",
								children: formatARS(total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "h-11 w-full bg-[var(--brand)] text-white hover:bg-[var(--brand)]/90",
							onClick: () => setOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/checkout",
								children: "Iniciar Compra"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: clear,
							className: "mt-2 w-full text-center text-xs text-muted-foreground hover:text-destructive",
							children: "Vaciar carrito"
						})
					]
				})
			]
		})
	});
}
function WhatsAppButton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
		initial: { scale: 0 },
		animate: { scale: 1 },
		whileHover: { scale: 1.1 },
		whileTap: { scale: .9 },
		href: "https://wa.me/5493517010095",
		target: "_blank",
		rel: "noreferrer",
		className: "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-shadow hover:shadow-xl md:bottom-8 md:right-8",
		"aria-label": "Contactar por WhatsApp",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			fill: "currentColor",
			className: "h-8 w-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" })
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[70vh] items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl font-bold text-[var(--brand)]",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Página no encontrada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "La página que buscás no existe o fue movida."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--brand)]/90",
						children: "Volver al inicio"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl font-semibold tracking-tight text-foreground",
					children: "Esta página no cargó"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Algo salió mal. Podés reintentar o volver al inicio."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brand)]/90",
						children: "Reintentar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent",
						children: "Ir al inicio"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Casa Romero Herrajes — 60 años de calidad en herrajes" },
			{
				name: "description",
				content: "Tienda online de herrajes en Córdoba. Manijas, bisagras, cerraduras, ménsulas, cortinas de enrollar y más. 60 años de trayectoria."
			},
			{
				name: "author",
				content: "Casa Romero Herrajes"
			},
			{
				property: "og:title",
				content: "Casa Romero Herrajes — Herrajes de primeras marcas"
			},
			{
				property: "og:description",
				content: "Amplio catálogo de herrajes con más de 60 años de experiencia. Envíos y retiro en Rivadavia 426, Córdoba."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col bg-background",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {})
			]
		}) })
	});
}
var $$splitComponentImporter$12 = () => import("./nosotros-DJ_-zhLk.mjs");
var Route$12 = createFileRoute("/nosotros")({
	head: () => ({ meta: [
		{ title: "Nosotros — Casa Romero Herrajes" },
		{
			name: "description",
			content: "Somos un negocio familiar con más de 60 años de trayectoria en el rubro de herrajes en Córdoba."
		},
		{
			property: "og:title",
			content: "Nosotros — Casa Romero"
		},
		{
			property: "og:description",
			content: "60 años de compromiso con la calidad, el asesoramiento y la buena atención."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./marcas-CRA4XcVF.mjs");
var Route$11 = createFileRoute("/marcas")({
	head: () => ({ meta: [
		{ title: "Marcas — Casa Romero Herrajes" },
		{
			name: "description",
			content: "Trabajamos con marcas líderes: Fumaca, Prive, Kallay, Simeplast, Bronzen, MR, FC Metalúrgica, Currao, Alce, Sidañez y Sica."
		},
		{
			property: "og:title",
			content: "Marcas — Casa Romero"
		},
		{
			property: "og:description",
			content: "Marcas de primer nivel para tus proyectos."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./contacto-CBbb_WDc.mjs");
var Route$10 = createFileRoute("/contacto")({
	head: () => ({ meta: [
		{ title: "Contacto — Casa Romero Herrajes" },
		{
			name: "description",
			content: "Rivadavia 426, Córdoba. Tel 351-4216433 · WhatsApp 3517010095. Lun-Vie 9-17, Sáb 9-13."
		},
		{
			property: "og:title",
			content: "Contacto — Casa Romero"
		},
		{
			property: "og:description",
			content: "Estamos en Rivadavia 426, Córdoba capital."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./checkout-BXDtbTAu.mjs");
var Route$9 = createFileRoute("/checkout")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./admin-BsI5hKoG.mjs");
var Route$8 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./routes-Cvb2-FM8.mjs");
var Route$7 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin.index-fn137Moe.mjs");
var Route$6 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./checkout.success-DNhJU3Pz.mjs");
var Route$5 = createFileRoute("/checkout/success")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin_.login-DGMXgaJf.mjs");
var Route$4 = createFileRoute("/admin_/login")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.products-CxfsXAZg.mjs");
var Route$3 = createFileRoute("/admin/products")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.orders-BOA-VgAo.mjs");
var Route$2 = createFileRoute("/admin/orders")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.categories-MUnukBqr.mjs");
var Route$1 = createFileRoute("/admin/categories")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.bulk-prices-ob0xgFcL.mjs");
var Route = createFileRoute("/admin/bulk-prices")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var NosotrosRoute = Route$12.update({
	id: "/nosotros",
	path: "/nosotros",
	getParentRoute: () => Route$13
});
var MarcasRoute = Route$11.update({
	id: "/marcas",
	path: "/marcas",
	getParentRoute: () => Route$13
});
var ContactoRoute = Route$10.update({
	id: "/contacto",
	path: "/contacto",
	getParentRoute: () => Route$13
});
var CheckoutRoute = Route$9.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$13
});
var AdminRoute = Route$8.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$13
});
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AdminIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var ProductoIdRoute = Route$15.update({
	id: "/producto/$id",
	path: "/producto/$id",
	getParentRoute: () => Route$13
});
var CheckoutSuccessRoute = Route$5.update({
	id: "/success",
	path: "/success",
	getParentRoute: () => CheckoutRoute
});
var CategoriaSlugRoute = Route$14.update({
	id: "/categoria/$slug",
	path: "/categoria/$slug",
	getParentRoute: () => Route$13
});
var AdminLoginRoute = Route$4.update({
	id: "/admin_/login",
	path: "/admin/login",
	getParentRoute: () => Route$13
});
var AdminProductsRoute = Route$3.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => AdminRoute
});
var AdminOrdersRoute = Route$2.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AdminRoute
});
var AdminCategoriesRoute = Route$1.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminBulkPricesRoute: Route.update({
		id: "/bulk-prices",
		path: "/bulk-prices",
		getParentRoute: () => AdminRoute
	}),
	AdminCategoriesRoute,
	AdminOrdersRoute,
	AdminProductsRoute,
	AdminIndexRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var CheckoutRouteChildren = { CheckoutSuccessRoute };
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRouteWithChildren,
	CheckoutRoute: CheckoutRoute._addFileChildren(CheckoutRouteChildren),
	ContactoRoute,
	MarcasRoute,
	NosotrosRoute,
	AdminLoginRoute,
	CategoriaSlugRoute,
	ProductoIdRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
