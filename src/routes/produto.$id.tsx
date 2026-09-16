import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Download, ShoppingCart, Star } from "lucide-react";
import { getProduto, produtos, formatarPreco } from "@/data/products";
import { ProductCover } from "@/components/ProductCover";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/produto/$id")({
  loader: ({ params }) => {
    const produto = getProduto(params.id);
    if (!produto) throw notFound();
    return { produto };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Produto indisponível — Projeto Fecap IFPB" }, { name: "robots", content: "noindex" }],
      };
    }
    const { produto } = loaderData;
    const titulo = `${produto.nome} — Projeto Fecap IFPB`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: produto.resumo },
        { property: "og:title", content: titulo },
        { property: "og:description", content: produto.resumo },
      ],
    };
  },
  component: ProdutoPage,
  notFoundComponent: ProdutoNaoEncontrado,
});

function ProdutoNaoEncontrado() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Produto não encontrado</h1>
      <Link to="/" className="mt-6 inline-block text-primary underline">
        Voltar ao catálogo
      </Link>
    </div>
  );
}

function ProdutoPage() {
  const { produto } = Route.useLoaderData();
  const { adicionar } = useCart();
  const relacionados = produtos
    .filter((p) => p.categoria === produto.categoria && p.id !== produto.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Catálogo
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <ProductCover produto={produto} large className="aspect-[4/3] rounded-xl border border-border" />

        <div>
          <span className="inline-block rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
            {produto.categoria}
          </span>
          <h1 className="mt-4 text-4xl font-bold">{produto.nome}</h1>
          <p className="mt-3 text-muted-foreground">{produto.resumo}</p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold">{produto.nota.toFixed(1)}</span>
            <span className="text-muted-foreground">· por {produto.autor}</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-4xl font-bold">{formatarPreco(produto.preco)}</span>
            {produto.precoDe && (
              <span className="mb-1 text-lg text-muted-foreground line-through">
                {formatarPreco(produto.precoDe)}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => adicionar(produto.id)}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <ShoppingCart className="h-4 w-4" /> Adicionar ao carrinho
            </button>
            <Link
              to="/carrinho"
              onClick={() => adicionar(produto.id)}
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary"
            >
              Comprar agora
            </Link>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-lg border border-border bg-card p-5 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Formato</dt>
              <dd className="mt-1 font-medium">{produto.formato}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Tamanho</dt>
              <dd className="mt-1 font-medium">{produto.tamanho}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Entrega</dt>
              <dd className="mt-1 flex items-center gap-2 font-medium">
                <Download className="h-4 w-4 text-primary" /> Download imediato após a compra
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold">Sobre o produto</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{produto.descricao}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {["Acesso vitalício ao arquivo", "Atualizações incluídas", "Suporte por e-mail"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> {item}
                </li>
              ),
            )}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {produto.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {relacionados.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Da mesma categoria</h2>
            <ul className="mt-3 space-y-3">
              {relacionados.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/produto/$id"
                    params={{ id: p.id }}
                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary"
                  >
                    <ProductCover produto={p} className="h-16 w-16 shrink-0 rounded-md" />
                    <span className="flex-1">
                      <span className="block font-medium">{p.nome}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatarPreco(p.preco)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
