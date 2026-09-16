import type { Product } from "@/data/products";

export function ProductCover({
  produto,
  className = "",
  large = false,
}: {
  produto: Product;
  className?: string;
  large?: boolean;
}) {
  const iniciais = produto.nome
    .split(" ")
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 15% 10%, ${produto.cor} 0%, transparent 60%), var(--surface-2)`,
      }}
      aria-hidden="true"
    >
      <div className="grade-fundo absolute inset-0 opacity-40" />
      <div className="relative flex h-full flex-col justify-between p-5">
        <span className="font-display text-xs uppercase tracking-[0.25em] text-foreground/70">
          {produto.categoria}
        </span>
        <span
          className={`font-display font-bold leading-none text-foreground/90 ${large ? "text-7xl" : "text-5xl"}`}
        >
          {iniciais}
        </span>
      </div>
    </div>
  );
}
