import { useEffect, useState } from "react";
import { useNavigate, NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Package, Inbox, FileText, LogOut, Zap, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin", label: "Обзор", icon: LayoutGrid, end: true },
  { to: "/admin/categories", label: "Категории", icon: Package },
  { to: "/admin/products", label: "Товары", icon: Package },
  { to: "/admin/leads", label: "Заявки", icon: Inbox },
  { to: "/admin/content", label: "Контент главной", icon: FileText },
];

export default function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground font-mono">Загрузка...</div>;
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="max-w-md text-center corner-frame p-10 bg-card/60 backdrop-blur">
          <ShieldAlert className="h-16 w-16 text-warning mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-3">Доступ запрещён</h1>
          <p className="text-muted-foreground mb-6">
            Ваш аккаунт <span className="text-primary font-mono">{user.email}</span> не имеет роли администратора.
            Обратитесь к владельцу системы для назначения прав.
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild variant="outline"><Link to="/">На сайт</Link></Button>
            <Button onClick={logout}>Выйти</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r border-border flex flex-col bg-sidebar shrink-0">
        <Link to="/" className="flex items-center gap-2 p-6 border-b border-sidebar-border">
          <div className="h-8 w-8 grid place-items-center border border-primary/60">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div className="font-mono text-xs">
            <div className="text-primary tracking-[0.25em]">DEMETRA</div>
            <div className="text-muted-foreground">// ADMIN</div>
          </div>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-mono uppercase tracking-wider transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-primary border-l-2 border-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary border-l-2 border-transparent"
                )
              }
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <div className="px-3 py-2 mb-2 font-mono text-xs text-muted-foreground truncate">{user.email}</div>
          <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start">
            <LogOut /> Выйти
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
