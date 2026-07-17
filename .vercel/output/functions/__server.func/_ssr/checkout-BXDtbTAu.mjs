import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as collection, d as serverTimestamp, t as addDoc } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as db } from "./firebase-BBCvycKQ.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as formatARS, r as useCart } from "./cart-Dvgv3E-F.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-Bggk2uA1.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BXDtbTAu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createPreferenceFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("2d004edce7ad7c7cf5a418fe9c731652ee988ecbf89fdba4fd187bb1e2a742c8"));
function CheckoutPage() {
	const { items, total, clear } = useCart();
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		nombre: "",
		apellido: "",
		email: "",
		telefono: "",
		dni: "",
		metodoEnvio: "acordar",
		direccion: "",
		ciudad: "",
		provincia: "",
		codigoPostal: ""
	});
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (items.length === 0) return;
		setLoading(true);
		try {
			const orderRef = await addDoc(collection(db, "orders"), {
				customer: formData,
				items,
				subtotal: total,
				shippingCost: 0,
				total,
				status: "pending",
				createdAt: serverTimestamp()
			});
			clear();
			const baseUrl = window.location.origin;
			const { init_point } = await createPreferenceFn({ data: {
				orderId: orderRef.id,
				customer: formData,
				items,
				baseUrl
			} });
			if (init_point) window.location.href = init_point;
			else throw new Error("No se recibió el init_point de Mercado Pago");
		} catch (error) {
			console.error("Error al procesar el pedido:", error);
			alert("Hubo un error al procesar tu pedido. Por favor, intentá de nuevo.");
			setLoading(false);
		}
	};
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					className: "h-10 w-10",
					fill: "none",
					viewBox: "0 0 24 24",
					stroke: "currentColor",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						strokeLinecap: "round",
						strokeLinejoin: "round",
						strokeWidth: 2,
						d: "M5 13l4 4L19 7"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-bold text-foreground",
				children: "¡Orden creada con éxito!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg text-muted-foreground",
				children: "Hemos registrado tu pedido correctamente. En breve nos contactaremos para coordinar el pago y envío."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "bg-[var(--brand)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						children: "Volver a la tienda"
					})
				})
			})
		]
	});
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: "Tu carrito está vacío"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground",
				children: "Agregá productos para poder realizar la compra."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => navigate({ to: "/" }),
				className: "mt-6 bg-[var(--brand)]",
				children: "Volver al catálogo"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-8 font-display text-3xl font-bold text-foreground",
			children: "Finalizar Compra"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-12 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-4 font-display text-xl font-semibold",
								children: "1. Datos Personales"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1 block text-sm font-medium",
										children: "Nombre"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "text",
										name: "nombre",
										value: formData.nombre,
										onChange: handleChange,
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1 block text-sm font-medium",
										children: "Apellido"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "text",
										name: "apellido",
										value: formData.apellido,
										onChange: handleChange,
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1 block text-sm font-medium",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "email",
										name: "email",
										value: formData.email,
										onChange: handleChange,
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1 block text-sm font-medium",
										children: "Teléfono (WhatsApp)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "tel",
										name: "telefono",
										value: formData.telefono,
										onChange: handleChange,
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "mb-1 block text-sm font-medium",
											children: "DNI / CUIT"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "text",
											name: "dni",
											value: formData.dni,
											onChange: handleChange,
											className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-6 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mb-4 font-display text-xl font-semibold",
									children: "2. Entrega"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1 block text-sm font-medium",
										children: "Método de Envío / Retiro"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "metodoEnvio",
										value: formData.metodoEnvio,
										onChange: handleChange,
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "acordar",
												children: "Acordar con el vendedor (Retiro en local)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "andreani",
												children: "Andreani (Próximamente)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "viacargo",
												children: "Vía Cargo (Próximamente)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "uber",
												children: "Uber Entregas (Solo Córdoba)"
											})
										]
									})]
								}),
								formData.metodoEnvio !== "acordar" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "mb-1 block text-sm font-medium",
												children: "Dirección"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												required: true,
												type: "text",
												name: "direccion",
												value: formData.direccion,
												onChange: handleChange,
												className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "mb-1 block text-sm font-medium",
											children: "Ciudad"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "text",
											name: "ciudad",
											value: formData.ciudad,
											onChange: handleChange,
											className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "mb-1 block text-sm font-medium",
											children: "Provincia"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "text",
											name: "provincia",
											value: formData.provincia,
											onChange: handleChange,
											className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "mb-1 block text-sm font-medium",
												children: "Código Postal"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												required: true,
												type: "text",
												name: "codigoPostal",
												value: formData.codigoPostal,
												onChange: handleChange,
												className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
											})]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading,
							className: "h-12 w-full bg-[var(--brand)] text-base font-semibold hover:bg-[var(--brand)]/90",
							children: loading ? "Procesando..." : "Confirmar Pedido"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-24 rounded-xl border border-border bg-[var(--surface-muted)] p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 font-display text-xl font-semibold",
							children: "Resumen del Pedido"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 max-h-[40vh] overflow-y-auto space-y-4 pr-2",
							children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold",
										children: [i.qty, "x"]
									}),
									" ",
									i.name,
									i.variantLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: i.variantLabel
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: formatARS(i.price * i.qty)
								})]
							}, i.productId + i.variantKey))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between font-display text-xl font-bold text-[var(--brand)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatARS(total) })]
							})
						})
					]
				})
			})]
		})]
	});
}
//#endregion
export { CheckoutPage as component };
