import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ShoppingCart, Star, SlidersHorizontal } from "lucide-react";
import { produtos, categorias, formatarPreco } from "@/data/products";
import { ProductCover } from "@/components/ProductCover";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Projeto Fecap IFPB — Loja de Produtos Digitais" },
      {
        name: "description",
        content:
          "Cursos, e-books, templates, softwares e planilhas com download imediato. Catálogo com filtros, busca e checkout simulado.",
      },
      { property: "og:title", content: "Projeto Fecap IFPB — Loja de Produtos Digitais" },
      {
        property: "og:description",
        content: "Cursos, e-books, templates e planilhas com download imediato.",
      },
    ],
  }),
  component: Catalogo,
});

type Ordem = "relevancia" | "menor" | "maior" | "nota";

function Catalogo() {
  const { adicionar } = useCart();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [ordem, setOrdem] = useState<Ordem>("relevancia");

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const filtrada = produtos.filter((p) => {
      const porCategoria = categoria === "Todos" || p.categoria === categoria;
      const porTermo =
        termo === "" ||
        p.nome.toLowerCase().includes(termo) ||
        p.resumo.toLowerCase().includes(termo) ||
        p.tags.some((t) => t.includes(termo));
      return porCategoria && porTermo;
    });
    const copia = [...filtrada];
    if (ordem === "menor") copia.sort((a, b) => a.preco - b.preco);
    if (ordem === "maior") copia.sort((a, b) => b.preco - a.preco);
    if (ordem === "nota") copia.sort((a, b) => b.nota - a.nota);
    return copia;
  }, [busca, categoria, ordem]);

  const destaque = produtos.find((p) => p.destaque)!;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grade-fundo absolute inset-0 opacity-50" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
              Loja acadêmica de produtos digitais
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl">
              Projeto Fecap IFPB
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Cursos, e-books, templates, softwares e planilhas produzidos por professores e alunos.
              Compre, baixe na hora e comece a usar.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <div>
                <p className="font-display text-2xl font-bold">{produtos.length}</p>
                <p className="text-muted-foreground">produtos</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold">{categorias.length - 1}</p>
                <p className="text-muted-foreground">categorias</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold">4.6</p>
                <p className="text-muted-foreground">nota média</p>
              </div>
            </div>
          </div>

          <Link
            to="/produto/$id"
            params={{ id: destaque.id }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary"
          >
            <ProductCover produto={destaque} large className="h-48" />
            <div className="p-6">
              <span className="text-xs uppercase tracking-widest text-primary">Mais vendido</span>
              <h2 className="mt-2 text-2xl font-semibold">{destaque.nome}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{destaque.resumo}</p>
              <p className="mt-4 font-display text-2xl font-bold">
                {formatarPreco(destaque.preco)}
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, tema ou tag..."
              aria-label="Buscar produtos"
              className="w-full rounded-md border border-input bg-card py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Ordenar</span>
            <select
              value={ordem}
              onChange={(e) => setOrdem(e.target.value as Ordem)}
              className="rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="relevancia">Relevância</option>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
              <option value="nota">Melhor avaliados</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setCategoria(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                categoria === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {lista.length} produto(s) encontrado(s)
        </p>

        {lista.length === 0 ? (
          <p className="mt-12 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
            Nenhum produto corresponde à sua busca. Tente outro termo ou categoria.
          </p>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((p) => (
              <li
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary"
              >
                <Link to="/produto/$id" params={{ id: p.id }} className="block">
                  <ProductCover produto={p} className="h-40" />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="uppercase tracking-widest">{p.categoria}</span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      {p.nota.toFixed(1)}
                    </span>
                  </div>
                  <Link
                    to="/produto/$id"
                    params={{ id: p.id }}
                    className="mt-2 font-display text-lg font-semibold leading-snug hover:text-primary"
                  >
                    {p.nome}
                  </Link>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.resumo}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div>
                      {p.precoDe && (
                        <span className="block text-xs text-muted-foreground line-through">
                          {formatarPreco(p.precoDe)}
                        </span>
                      )}
                      <span className="font-display text-xl font-bold">
                        {formatarPreco(p.preco)}
                      </span>
                    </div>
                    <button
                      onClick={() => adicionar(p.id)}
                      aria-label={`Adicionar ${p.nome} ao carrinho`}
                      className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Adicionar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
