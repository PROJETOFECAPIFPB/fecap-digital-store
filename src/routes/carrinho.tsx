import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatarPreco } from "@/data/products";
import { ProductCover } from "@/components/ProductCover";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — Projeto Fecap IFPB" },
      {
        name: "description",
        content: "Revise os produtos digitais escolhidos e aplique seu cupom antes de finalizar.",
      },
      { property: "og:title", content: "Carrinho — Projeto Fecap IFPB" },
      {
        property: "og:description",
        content: "Revise os produtos digitais escolhidos e aplique seu cupom antes de finalizar.",
      },
    ],
  }),
  component: CarrinhoPage,
});

function CarrinhoPage() {
  const { detalhados, subtotal, desconto, total, cupom, aplicarCupom, definirQtd, remover } =
    useCart();
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");

  if (detalhados.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Seu carrinho está vazio</h1>
        <p className="mt-3 text-muted-foreground">
          Explore o catálogo e adicione cursos, e-books, templates e mais.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Ver catálogo <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Carrinho</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {detalhados.length} produto(s) · entrega imediata por download
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="space-y-4">
          {detalhados.map(({ produto, qtd }) => (
            <li
              key={produto.id}
              className="flex gap-4 rounded-lg border border-border bg-card p-4"
            >
              <ProductCover produto={produto} className="hidden h-24 w-24 rounded-md sm:block" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      to="/produto/$id"
                      params={{ id: produto.id }}
                      className="font-display font-semibold hover:text-primary"
                    >
                      {produto.nome}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {produto.categoria} · {produto.formato}
                    </p>
                  </div>
                  <button
                    onClick={() => remover(produto.id)}
                    aria-label={`Remover ${produto.nome}`}
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="inline-flex items-center rounded-md border border-border">
                    <button
                      onClick={() => definirQtd(produto.id, qtd - 1)}
                      aria-label="Diminuir quantidade"
                      className="px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{qtd}</span>
                    <button
                      onClick={() => definirQtd(produto.id, qtd + 1)}
                      aria-label="Aumentar quantidade"
                      className="px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-display font-semibold">
                    {formatarPreco(produto.preco * qtd)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Resumo</h2>

          <div className="mt-5">
            <label htmlFor="cupom" className="text-xs uppercase tracking-widest text-muted-foreground">
              Cupom
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="cupom"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="FECAP10"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                onClick={() => {
                  const ok = aplicarCupom(codigo);
                  setErro(ok ? "" : "Cupom inválido");
                  if (ok) setCodigo("");
                }}
                className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:border-primary hover:text-primary"
              >
                Aplicar
              </button>
            </div>
            {erro && <p className="mt-2 text-xs text-destructive">{erro}</p>}
            {cupom && (
              <p className="mt-2 text-xs text-success">Cupom {cupom} aplicado com sucesso.</p>
            )}
          </div>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatarPreco(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Desconto</dt>
              <dd className="text-success">-{formatarPreco(desconto)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-lg font-bold">
              <dt>Total</dt>
              <dd>{formatarPreco(total)}</dd>
            </div>
          </dl>

          <Link
            to="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Ir para o checkout <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Compra simulada para fins acadêmicos.
          </p>
        </aside>
      </div>
    </div>
  );
}
