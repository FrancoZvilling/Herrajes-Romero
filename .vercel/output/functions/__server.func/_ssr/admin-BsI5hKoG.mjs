import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as Outlet, g as useNavigate, h as Link, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Logo } from "./Logo-BXzxn3NU.mjs";
import "../_libs/firebase.mjs";
import { i as signOut, n as onAuthStateChanged } from "../_libs/firebase__auth.mjs";
import { t as auth } from "./firebase-BBCvycKQ.mjs";
import { C as LogOut, T as LayoutDashboard, c as Tags, k as DollarSign, t as X, u as ShoppingCart, v as Package, x as Menu } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BsI5hKoG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLayout() {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [user, setUser] = (0, import_react.useState)(null);
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) navigate({ to: "/admin/login" });
			else setUser(currentUser);
			setLoading(false);
		});
		return () => unsubscribe();
	}, [navigate]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center font-display font-semibold",
		children: "Cargando..."
	});
	if (!user) return null;
	const handleLogout = async () => {
		await signOut(auth);
		router.invalidate();
		navigate({ to: "/admin/login" });
	};
	const menuItems = [
		{
			name: "Dashboard",
			path: "/admin",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-5 w-5" })
		},
		{
			name: "Órdenes",
			path: "/admin/orders",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" })
		},
		{
			name: "Productos",
			path: "/admin/products",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" })
		},
		{
			name: "Categorías",
			path: "/admin/categories",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tags, { className: "h-5 w-5" })
		},
		{
			name: "Precios Masivos",
			path: "/admin/bulk-prices",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-5 w-5" })
		}
	];
	const Sidebar = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-[var(--ink)] text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-16 items-center border-b border-white/10 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "[&_span]:!text-white [&_.text-muted-foreground]:!text-white/60" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 space-y-1 p-4",
				children: menuItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.path,
					activeProps: { className: "bg-[var(--brand)] text-white" },
					activeOptions: { exact: item.path === "/admin" },
					onClick: () => setMobileMenuOpen(false),
					className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white",
					children: [item.icon, item.name]
				}, item.path))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-white/10 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleLogout,
					className: "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-5 w-5" }), "Cerrar Sesión"]
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-[var(--surface)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden w-64 lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:hidden",
				children: mobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 z-50 flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fixed inset-0 bg-black/50",
							onClick: () => setMobileMenuOpen(false)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative w-64",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute right-4 top-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "text-white",
								onClick: () => setMobileMenuOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMobileMenuOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 lg:p-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			})
		]
	});
}
//#endregion
export { AdminLayout as component };
