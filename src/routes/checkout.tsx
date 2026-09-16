import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, CreditCard, Loader2, QrCode, Receipt } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatarPreco } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Projeto Fecap IFPB" },
      {
        name: "description",
        content: "Finalize sua compra simulada de produtos digitais com cartão, Pix ou boleto.",
      },
      { property: "og:title", content: "Checkout — Projeto Fecap IFPB" },
      {
        property: "og:description",
        content: "Finalize sua compra simulada de produtos digitais com cartão, Pix ou boleto.",
      },
    ],
  }),
  component: CheckoutPage,
});

type Pagamento = "cartao" | "pix" | "boleto";

function CheckoutPage() {
  const { detalhados, total, subtotal, desconto, limpar } = useCart();
  const [pagamento, setPagamento] = useState<Pagamento>("cartao");
  const [processando, setProcessando] = useState(false);
  const [pedido, setPedido] = useState<{ codigo: string; valor: number } | null>(null);

  function finalizar(e: React.FormEvent) {
    e.preventDefault();
    setProcessando(true);
    const valor = total;
    setTimeout(() => {
      setPedido({ codigo: `FEC-${Math.floor(100000 + Math.random() * 899999)}`, valor });
      setProcessando(false);
      limpar();
    }, 1600);
  }

  if (pedido) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
        <h1 className="mt-6 text-3xl font-bold">Pedido confirmado!</h1>
        <p className="mt-3 text-muted-foreground">
          Pedido <strong className="text-foreground">{pedido.codigo}</strong> no valor de{" "}
          {formatarPreco(pedido.valor)}. Os links de download foram enviados para o seu e-mail.
        </p>
        <p className="mt-4 rounded-md border border-border bg-card px-4 py-3 text-xs text-muted-foreground">
          Esta é uma compra simulada — nenhum pagamento real foi processado.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  if (detalhados.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Nada para finalizar</h1>
        <p className="mt-3 text-muted-foreground">Adicione produtos ao carrinho primeiro.</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  const campo =
    "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Ambiente de demonstração — nenhum dado é enviado ou cobrado.
      </p>

      <form onSubmit={finalizar} className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Seus dados</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                Nome completo
                <input required className={campo} placeholder="Maria da Silva" />
              </label>
              <label className="text-sm">
                E-mail
                <input required type="email" className={campo} placeholder="maria@email.com" />
              </label>
              <label className="text-sm">
                CPF
                <input required className={campo} placeholder="000.000.000-00" />
              </label>
              <label className="text-sm">
                Telefone
                <input required className={campo} placeholder="(83) 90000-0000" />
              </label>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Pagamento</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {(
                [
                  { id: "cartao", label: "Cartão", icon: CreditCard },
                  { id: "pix", label: "Pix", icon: QrCode },
                  { id: "boleto", label: "Boleto", icon: Receipt },
                ] as const
              ).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPagamento(id)}
                  className={`flex items-center gap-2 rounded-md border px-4 py-3 text-sm font-medium transition-colors ${
                    pagamento === id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>

            {pagamento === "cartao" && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-sm sm:col-span-2">
                  Número do cartão
                  <input required className={campo} placeholder="4111 1111 1111 1111" />
                </label>
                <label className="text-sm">
                  Validade
                  <input required className={campo} placeholder="12/29" />
                </label>
                <label className="text-sm">
                  CVV
                  <input required className={campo} placeholder="123" />
                </label>
              </div>
            )}
            {pagamento === "pix" && (
              <p className="mt-5 rounded-md bg-secondary p-4 text-sm text-muted-foreground">
                Ao confirmar, um QR Code simulado será gerado com validade de 30 minutos.
              </p>
            )}
            {pagamento === "boleto" && (
              <p className="mt-5 rounded-md bg-secondary p-4 text-sm text-muted-foreground">
                O boleto simulado vence em 3 dias úteis e a liberação é imediata nesta demonstração.
              </p>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Seu pedido</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {detalhados.map(({ produto, qtd }) => (
              <li key={produto.id} className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {qtd}× {produto.nome}
                </span>
                <span>{formatarPreco(produto.preco * qtd)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatarPreco(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Desconto</dt>
              <dd className="text-success">-{formatarPreco(desconto)}</dd>
            </div>
            <div className="flex justify-between font-display text-lg font-bold">
              <dt>Total</dt>
              <dd>{formatarPreco(total)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            disabled={processando}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {processando ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processando...
              </>
            ) : (
              <>Confirmar compra</>
            )}
          </button>
        </aside>
      </form>
    </div>
  );
}
