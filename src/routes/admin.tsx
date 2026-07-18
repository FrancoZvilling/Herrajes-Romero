import { createFileRoute, Link, Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  LayoutDashboard,
  Package,
  Tags,
  DollarSign,
  LogOut,
  ShoppingCart,
  Menu,
  X
} from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate({ to: "/admin/login" });
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center font-display font-semibold">Cargando...</div>;
  }

  if (!user) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.invalidate();
    navigate({ to: "/admin/login" });
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Órdenes", path: "/admin/orders", icon: <ShoppingCart className="h-5 w-5" /> },
    { name: "Productos", path: "/admin/products", icon: <Package className="h-5 w-5" /> },
    { name: "Categorías", path: "/admin/categories", icon: <Tags className="h-5 w-5" /> },
    { name: "Precios Masivos", path: "/admin/bulk-prices", icon: <DollarSign className="h-5 w-5" /> },
  ];

  const Sidebar = () => (
    <div className="flex h-full flex-col bg-[var(--ink)] text-white">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Logo className="[&_span]:!text-white [&_.text-muted-foreground]:!text-white/60" />
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            activeProps={{ className: "bg-[var(--brand)] text-white" }}
            activeOptions={{ exact: item.path === "/admin" }}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[var(--surface)]">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 shrink-0 lg:sticky lg:top-0 lg:block lg:h-screen">
        <Sidebar />
      </aside>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-64">
              <Sidebar />
            </div>
            <div className="absolute right-4 top-4">
              <button className="text-white" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}
      </div>

      <main className="flex-1">
        {/* Header Mobile */}
        <div className="flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
          <Logo />
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
