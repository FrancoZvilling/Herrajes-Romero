import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { N as Award, P as ArrowRight, f as ShieldCheck, i as Truck, n as Wrench } from "../_libs/lucide-react.mjs";
import { i as useProducts, n as useCategories, t as useBrands } from "./useCatalog-fdXhoxOt.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as ProductCard } from "./ProductCard-CiiX8gmV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cvb2-FM8.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { data: products = [] } = useProducts();
	const { data: categories = [] } = useCategories();
	const { data: brands = [] } = useBrands();
	const featured = products.filter((p) => p.featured).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-[var(--ink)] text-white",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[var(--brand)] opacity-30 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[var(--brand)] opacity-10 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x relative grid gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .4 },
						className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--brand)]" }), "60 años ferreteando en Córdoba"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							delay: .05
						},
						className: "mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl",
						children: ["Herrajes que", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[var(--brand)]",
							children: "sostienen tu obra."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							delay: .15
						},
						className: "mt-6 max-w-lg text-base text-white/70 sm:text-lg",
						children: "Encontrá miles de soluciones para cada proyecto. Productos de calidad, atención personalizada y el respaldo de una empresa familiar con más de 60 años de trayectoria."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							delay: .25
						},
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/categoria/$slug",
							params: { slug: "linea-puerta" },
							className: "group inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition hover:brightness-110 active:scale-[0.98]",
							children: ["Ver catálogo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contacto",
							className: "inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10",
							children: "Hablar con un experto"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								n: "60+",
								l: "años"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								n: "10k+",
								l: "productos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								n: "11",
								l: "marcas líderes"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						scale: .96
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						duration: .6,
						delay: .2
					},
					className: "relative hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-4",
						children: categories.slice(0, 4).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/categoria/$slug",
							params: { slug: c.slug },
							className: `group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur transition hover:border-[var(--brand)] hover:bg-white/[0.06] ${i === 1 ? "translate-y-8" : ""} ${i === 3 ? "translate-y-8" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--brand),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex h-full flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--brand)]/20 text-[var(--brand)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-semibold text-white",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-white/60",
									children: c.description
								})] })]
							})]
						}, c.slug))
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-[var(--surface)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {}),
						title: "Primeras marcas",
						text: "Fumaca, Prive, Kallay y más"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
						title: "60 años",
						text: "Trayectoria familiar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {}),
						title: "Retiro y envío",
						text: "Rivadavia 426, Córdoba"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {}),
						title: "Asesoramiento",
						text: "Te ayudamos a elegir"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-x py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-widest text-[var(--brand)]",
					children: "Explorá"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl font-bold tracking-tight",
					children: "Todas las categorías"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden max-w-xs text-sm text-muted-foreground md:block",
					children: "Organizamos nuestro catálogo por línea para que encuentres al toque lo que buscás."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: categories.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .3,
						delay: i * .03
					},
					className: "h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categoria/$slug",
						params: { slug: c.slug },
						className: "group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 p-6 shadow-xl card-hover",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110",
								style: { backgroundImage: `url('/categories/${c.slug}.png')` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--brand)]/90 text-white backdrop-blur shadow-sm transition-colors group-hover:bg-[var(--brand)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "relative z-10 font-display text-lg font-semibold text-white drop-shadow-md",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "relative z-10 mt-1 text-sm text-white/90 drop-shadow-md",
								children: c.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative z-10 mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--brand)] drop-shadow-sm brightness-125",
								children: ["Ver productos", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
							})
						]
					})
				}, c.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-[var(--surface)] py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-[var(--brand)]",
						children: "Destacados"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl font-bold tracking-tight",
						children: "Los más pedidos"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
					children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-x py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-widest text-[var(--brand)]",
					children: "Trabajamos con"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-bold",
					children: "Marcas de primer nivel"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap justify-center gap-3",
				children: brands.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-lg border border-border bg-card px-5 py-3 font-display text-sm font-semibold text-foreground/70 transition hover:border-[var(--brand)] hover:text-[var(--brand)]",
					children: b
				}, b))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-x pb-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-3xl bg-[var(--ink)] px-8 py-16 text-white sm:px-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--brand)] opacity-30 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-3xl font-bold sm:text-4xl",
						children: "¿No encontrás lo que buscás?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-lg text-white/70",
						children: "Escribinos por WhatsApp y un asesor te responde en minutos. Trabajamos a pedido y con envíos a todo el país."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://wa.me/5493517010095",
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 font-semibold text-white shadow-[var(--shadow-brand)] transition hover:brightness-110",
						children: ["Consultar ahora", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})]
				})]
			})
		})
	] });
}
function Stat({ n, l }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "font-display text-3xl font-bold text-white",
		children: n
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 text-xs uppercase tracking-wider text-white/50",
		children: l
	})] });
}
function Value({ icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm font-semibold text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-muted-foreground",
			children: text
		})] })]
	});
}
//#endregion
export { Home as component };
