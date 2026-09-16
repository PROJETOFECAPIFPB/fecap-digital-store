export type Product = {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  precoDe?: number;
  resumo: string;
  descricao: string;
  formato: string;
  tamanho: string;
  autor: string;
  nota: number;
  destaque?: boolean;
  tags: string[];
  cor: string;
};

export const categorias = [
  "Todos",
  "Cursos",
  "E-books",
  "Templates",
  "Softwares",
  "Design",
  "Planilhas",
];

export const produtos: Product[] = [
  {
    id: "curso-react-do-zero",
    nome: "React do Zero ao Deploy",
    categoria: "Cursos",
    preco: 149.9,
    precoDe: 249.9,
    resumo: "42 aulas em vídeo sobre componentes, rotas e publicação.",
    descricao:
      "Um curso completo e direto ao ponto: você começa pelos fundamentos de componentes e estado, passa por rotas, consumo de APIs e finaliza publicando um projeto real. Inclui desafios práticos e certificado de conclusão.",
    formato: "Vídeo MP4 + materiais",
    tamanho: "6,4 GB",
    autor: "Equipe FECAP IFPB",
    nota: 4.9,
    destaque: true,
    tags: ["frontend", "iniciante", "certificado"],
    cor: "oklch(0.75 0.19 150)",
  },
  {
    id: "ebook-logica-programacao",
    nome: "Lógica de Programação na Prática",
    categoria: "E-books",
    preco: 39.9,
    resumo: "230 páginas com 120 exercícios resolvidos passo a passo.",
    descricao:
      "Material pensado para quem está começando: cada conceito vem com exemplo, exercício e solução comentada. Ideal para acompanhar as primeiras disciplinas da graduação.",
    formato: "PDF + EPUB",
    tamanho: "18 MB",
    autor: "Prof. Marina Alves",
    nota: 4.7,
    tags: ["algoritmos", "iniciante"],
    cor: "oklch(0.78 0.16 85)",
  },
  {
    id: "template-dashboard-admin",
    nome: "Dashboard Admin Pro",
    categoria: "Templates",
    preco: 89.0,
    precoDe: 129.0,
    resumo: "28 telas prontas, modo escuro e componentes reutilizáveis.",
    descricao:
      "Kit de interface completo para painéis administrativos: gráficos, tabelas, formulários, autenticação e configurações. Entregue com código organizado e guia de personalização.",
    formato: "Código + Figma",
    tamanho: "240 MB",
    autor: "Studio Caatinga",
    nota: 4.8,
    destaque: true,
    tags: ["ui", "dark mode", "figma"],
    cor: "oklch(0.7 0.17 250)",
  },
  {
    id: "software-gerador-relatorios",
    nome: "Gerador de Relatórios TCC",
    categoria: "Softwares",
    preco: 59.9,
    resumo: "Formata capa, sumário e referências em ABNT automaticamente.",
    descricao:
      "Aplicativo para desktop que monta a estrutura ABNT do seu trabalho acadêmico em segundos. Exporta em DOCX e PDF, com verificação de citações e lista de referências.",
    formato: "Instalador Windows/macOS",
    tamanho: "96 MB",
    autor: "Laboratório de Software",
    nota: 4.5,
    tags: ["abnt", "produtividade"],
    cor: "oklch(0.72 0.18 20)",
  },
  {
    id: "pack-icones-vetoriais",
    nome: "Pack 800 Ícones Vetoriais",
    categoria: "Design",
    preco: 29.9,
    resumo: "Ícones em SVG nos estilos linha, sólido e duotone.",
    descricao:
      "Biblioteca com 800 ícones organizados por categoria, todos editáveis e otimizados para web. Inclui arquivos SVG, fonte de ícones e projeto Figma.",
    formato: "SVG + Figma",
    tamanho: "62 MB",
    autor: "Ana Ribeiro",
    nota: 4.6,
    tags: ["svg", "ui kit"],
    cor: "oklch(0.74 0.16 310)",
  },
  {
    id: "planilha-controle-financeiro",
    nome: "Planilha de Controle Financeiro",
    categoria: "Planilhas",
    preco: 24.9,
    resumo: "Fluxo de caixa, metas e gráficos automáticos.",
    descricao:
      "Planilha pronta para acompanhar receitas, despesas e metas mensais. Dashboards atualizam sozinhos e há uma aba de simulação de investimentos.",
    formato: "XLSX + Google Sheets",
    tamanho: "4 MB",
    autor: "Núcleo de Gestão FECAP",
    nota: 4.4,
    tags: ["finanças", "gestão"],
    cor: "oklch(0.8 0.15 130)",
  },
  {
    id: "curso-banco-de-dados",
    nome: "Banco de Dados e SQL Aplicado",
    categoria: "Cursos",
    preco: 119.9,
    resumo: "Modelagem, consultas avançadas e otimização na prática.",
    descricao:
      "Do modelo entidade-relacionamento às consultas complexas. Você aprende a modelar, popular e otimizar bancos relacionais usando estudos de caso reais.",
    formato: "Vídeo MP4 + scripts",
    tamanho: "4,1 GB",
    autor: "Prof. Carlos Meneses",
    nota: 4.8,
    tags: ["sql", "backend"],
    cor: "oklch(0.76 0.14 200)",
  },
  {
    id: "ebook-ux-para-devs",
    nome: "UX para Desenvolvedores",
    categoria: "E-books",
    preco: 44.9,
    resumo: "Princípios de usabilidade explicados com exemplos de código.",
    descricao:
      "Um guia objetivo sobre hierarquia visual, acessibilidade, microinterações e testes com usuários — escrito para quem programa e quer entregar interfaces melhores.",
    formato: "PDF",
    tamanho: "22 MB",
    autor: "Júlia Tavares",
    nota: 4.7,
    tags: ["ux", "acessibilidade"],
    cor: "oklch(0.79 0.17 55)",
  },
  {
    id: "template-landing-startup",
    nome: "Landing Page para Startup",
    categoria: "Templates",
    preco: 69.0,
    resumo: "Página de conversão responsiva com seções modulares.",
    descricao:
      "Template de landing page com hero, prova social, planos e formulário. Seções independentes para você montar a página na ordem que quiser.",
    formato: "HTML + Tailwind",
    tamanho: "35 MB",
    autor: "Studio Caatinga",
    nota: 4.5,
    tags: ["marketing", "responsivo"],
    cor: "oklch(0.73 0.18 275)",
  },
  {
    id: "pack-mockups-produto",
    nome: "Mockups de Produto Digital",
    categoria: "Design",
    preco: 49.9,
    precoDe: 79.9,
    resumo: "40 cenas editáveis para apresentar apps e sites.",
    descricao:
      "Coleção de mockups em alta resolução com objetos inteligentes: notebooks, celulares e tablets em cenários claros e escuros.",
    formato: "PSD + PNG",
    tamanho: "1,8 GB",
    autor: "Ana Ribeiro",
    nota: 4.3,
    tags: ["apresentação", "psd"],
    cor: "oklch(0.77 0.13 340)",
  },
  {
    id: "software-api-monitor",
    nome: "Monitor de APIs",
    categoria: "Softwares",
    preco: 99.0,
    resumo: "Alertas de indisponibilidade e histórico de latência.",
    descricao:
      "Ferramenta leve para monitorar endpoints: define intervalos, recebe alertas e acompanha gráficos de tempo de resposta em um painel único.",
    formato: "Aplicação Node.js",
    tamanho: "48 MB",
    autor: "Laboratório de Software",
    nota: 4.6,
    tags: ["devops", "monitoramento"],
    cor: "oklch(0.71 0.16 230)",
  },
  {
    id: "planilha-tcc-cronograma",
    nome: "Cronograma de TCC",
    categoria: "Planilhas",
    preco: 19.9,
    resumo: "Gantt automático com marcos e prazos de entrega.",
    descricao:
      "Organize as etapas do trabalho de conclusão com gráfico de Gantt gerado automaticamente, checklist de entregas e alertas de prazo.",
    formato: "XLSX",
    tamanho: "3 MB",
    autor: "Núcleo de Gestão FECAP",
    nota: 4.2,
    tags: ["acadêmico", "organização"],
    cor: "oklch(0.82 0.14 105)",
  },
];

export function getProduto(id: string) {
  return produtos.find((p) => p.id === id);
}

export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
