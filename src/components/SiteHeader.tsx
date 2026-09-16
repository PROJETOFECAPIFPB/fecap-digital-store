import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { totalItens } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
            PF
          </span>
          <span className="font-display text-sm font-bold uppercase leading-tight tracking-[0.18em]">
            Projeto Fecap
            <span className="block text-[0.65rem] font-medium tracking-[0.3em] text-muted-foreground">
              IFPB · digital
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Catálogo
          </Link>
          <Link
            to="/carrinho"
            className="relative inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 transition-colors hover:border-primary hover:text-primary"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {totalItens > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                {totalItens}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
