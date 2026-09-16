import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { produtos, type Product } from "@/data/products";

export type CartItem = { id: string; qtd: number };

type CartContextValue = {
  itens: CartItem[];
  detalhados: { produto: Product; qtd: number }[];
  totalItens: number;
  subtotal: number;
  desconto: number;
  total: number;
  cupom: string | null;
  adicionar: (id: string, qtd?: number) => void;
  remover: (id: string) => void;
  definirQtd: (id: string, qtd: number) => void;
  aplicarCupom: (codigo: string) => boolean;
  limpar: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "fecap-ifpb-carrinho";

export const CUPONS: Record<string, number> = { FECAP10: 0.1, IFPB20: 0.2 };

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CartItem[]>([]);
  const [cupom, setCupom] = useState<string | null>(null);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        const dados = JSON.parse(salvo);
        setItens(Array.isArray(dados.itens) ? dados.itens : []);
        setCupom(typeof dados.cupom === "string" ? dados.cupom : null);
      }
    } catch {
      /* ignora leitura inválida */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ itens, cupom }));
    } catch {
      /* armazenamento indisponível */
    }
  }, [itens, cupom]);

  const value = useMemo<CartContextValue>(() => {
    const detalhados = itens
      .map((i) => {
        const produto = produtos.find((p) => p.id === i.id);
        return produto ? { produto, qtd: i.qtd } : null;
      })
      .filter((x): x is { produto: Product; qtd: number } => x !== null);

    const subtotal = detalhados.reduce((s, i) => s + i.produto.preco * i.qtd, 0);
    const taxa = cupom ? (CUPONS[cupom] ?? 0) : 0;
    const desconto = subtotal * taxa;

    return {
      itens,
      detalhados,
      totalItens: itens.reduce((s, i) => s + i.qtd, 0),
      subtotal,
      desconto,
      total: subtotal - desconto,
      cupom,
      adicionar: (id, qtd = 1) =>
        setItens((atual) => {
          const existe = atual.find((i) => i.id === id);
          if (existe) return atual.map((i) => (i.id === id ? { ...i, qtd: i.qtd + qtd } : i));
          return [...atual, { id, qtd }];
        }),
      remover: (id) => setItens((atual) => atual.filter((i) => i.id !== id)),
      definirQtd: (id, qtd) =>
        setItens((atual) =>
          qtd <= 0
            ? atual.filter((i) => i.id !== id)
            : atual.map((i) => (i.id === id ? { ...i, qtd } : i)),
        ),
      aplicarCupom: (codigo) => {
        const chave = codigo.trim().toUpperCase();
        if (CUPONS[chave]) {
          setCupom(chave);
          return true;
        }
        return false;
      },
      limpar: () => {
        setItens([]);
        setCupom(null);
      },
    };
  }, [itens, cupom]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de CartProvider");
  return ctx;
}
