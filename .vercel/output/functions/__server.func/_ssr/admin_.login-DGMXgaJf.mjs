import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Logo } from "./Logo-BXzxn3NU.mjs";
import "../_libs/firebase.mjs";
import { r as signInWithEmailAndPassword } from "../_libs/firebase__auth.mjs";
import { t as auth } from "./firebase-BBCvycKQ.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as Label, t as Input } from "./label-B7oQAA24.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin_.login-DGMXgaJf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const router = useRouter();
	const navigate = useNavigate();
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.invalidate();
			navigate({ to: "/admin" });
		} catch (err) {
			setError("Credenciales inválidas. Verifica tu email y contraseña.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen flex-col items-center justify-center bg-background p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm space-y-8 rounded-2xl border border-border bg-card p-8 shadow-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl font-bold tracking-tight",
					children: "Panel de Administración"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleLogin,
				className: "space-y-4",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-md bg-destructive/15 p-3 text-sm text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							placeholder: "admin@herrajesromero.com",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Contraseña"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "password",
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full bg-[var(--brand)] hover:bg-[var(--brand)]/90",
						disabled: loading,
						children: loading ? "Ingresando..." : "Ingresar"
					})
				]
			})]
		})
	});
}
//#endregion
export { AdminLogin as component };
