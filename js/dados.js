/* ==========================================================================
   RedeTrampo — Dados de demonstração (protótipo acadêmico)
   Os perfis de PROFISSIONAIS_DEMO abaixo são fictícios e aparecem identificados
   como exemplos. Cadastros, solicitações e avaliações enviados pelos formulários
   são gravados na base compartilhada Google Sheets por meio da API do projeto.
   ========================================================================== */

// ---------------------------------------------------------------------------
// Cidade e bairros de demonstração (RF05 - pesquisa por bairro/região)
// ESCOPO GEOGRÁFICO: o RedeTrampo atende EXCLUSIVAMENTE o município de
// Fortaleza - CE. Nenhuma outra cidade, município ou região metropolitana
// é contemplada no MVP.
// ---------------------------------------------------------------------------
const CIDADES_DEMO = [
  { id: "fortaleza", nome: "Fortaleza - CE", bairros: [
      "Centro", "Aldeota", "Meireles", "Papicu", "Cocó", "Messejana",
      "Parangaba", "Antônio Bezerra", "Barra do Ceará", "Montese",
      "José Walter", "Benfica", "Parquelândia", "Praia de Iracema", "Edson Queiroz"
    ] },
];

// ---------------------------------------------------------------------------
// Categorias de serviço (RF04)
// ---------------------------------------------------------------------------
const CATEGORIAS_DEMO = [
  { id: "eletricista", nome: "Eletricista", icone: "fa-solid fa-bolt", descricao: "Instalações e reparos elétricos" },
  { id: "encanador", nome: "Encanador(a)", icone: "fa-solid fa-faucet-drip", descricao: "Hidráulica e reparos de água" },
  { id: "pedreiro", nome: "Pedreiro(a)", icone: "fa-solid fa-trowel-bricks", descricao: "Alvenaria, reformas e acabamento" },
  { id: "pintor", nome: "Pintor(a)", icone: "fa-solid fa-paint-roller", descricao: "Pintura residencial e comercial" },
  { id: "costureira", nome: "Costureira(o)", icone: "fa-solid fa-scissors", descricao: "Costura, ajustes e reparos em tecido" },
  { id: "diarista", nome: "Diarista", icone: "fa-solid fa-broom", descricao: "Limpeza residencial e comercial" },
  { id: "cabeleireiro", nome: "Cabeleireiro(a) / Manicure", icone: "fa-solid fa-scissors", descricao: "Beleza, cabelo e unhas" },
  { id: "informatica", nome: "Técnico(a) de Informática", icone: "fa-solid fa-computer", descricao: "Manutenção de computadores e redes" },
  { id: "fotografo", nome: "Fotógrafo(a)", icone: "fa-solid fa-camera", descricao: "Fotografia de eventos e ensaios" },
  { id: "designer", nome: "Designer", icone: "fa-solid fa-pen-ruler", descricao: "Design gráfico e identidade visual" },
  { id: "outros", nome: "Outros Serviços", icone: "fa-solid fa-screwdriver-wrench", descricao: "Demais prestadores autônomos" },
];

// ---------------------------------------------------------------------------
// Profissionais de demonstração (dados fictícios para validação do protótipo)
// ---------------------------------------------------------------------------
const PROFISSIONAIS_DEMO = [
  { id: 1, nome: "João Exemplo da Silva", categoriaId: "eletricista", cidadeId: "fortaleza", bairro: "Aldeota",
    descricao: "Profissional fictício de demonstração. Atua com instalações elétricas residenciais e manutenção preventiva.",
    servicos: ["Instalação de tomadas e disjuntores", "Troca de fiação", "Manutenção de quadro elétrico"],
    avaliacao: 4.8, numAvaliacoes: 32, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 2, nome: "Maria Exemplo Souza", categoriaId: "diarista", cidadeId: "fortaleza", bairro: "Papicu",
    descricao: "Perfil fictício de demonstração. Serviços de limpeza residencial com experiência comprovada em protótipo.",
    servicos: ["Limpeza residencial completa", "Limpeza pós-obra (demonstrativo)", "Organização de ambientes"],
    avaliacao: 4.9, numAvaliacoes: 54, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 3, nome: "Carlos Exemplo Pereira", categoriaId: "pedreiro", cidadeId: "fortaleza", bairro: "Messejana",
    descricao: "Dados fictícios de demonstração. Experiência simulada em alvenaria e pequenas reformas.",
    servicos: ["Reboco e acabamento", "Construção de muros (demo)", "Pequenas reformas"],
    avaliacao: 4.6, numAvaliacoes: 21, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 4, nome: "Ana Exemplo Lima", categoriaId: "cabeleireiro", cidadeId: "fortaleza", bairro: "Centro",
    descricao: "Perfil de demonstração do protótipo. Serviços de beleza simulados para fins acadêmicos.",
    servicos: ["Corte de cabelo (demo)", "Manicure e pedicure (demo)", "Escova e tratamento"],
    avaliacao: 4.7, numAvaliacoes: 40, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 5, nome: "Pedro Exemplo Costa", categoriaId: "informatica", cidadeId: "fortaleza", bairro: "Parangaba",
    descricao: "Dados fictícios. Suporte técnico simulado em computadores e redes domésticas.",
    servicos: ["Formatação e manutenção", "Configuração de redes Wi-Fi", "Remoção de vírus (demo)"],
    avaliacao: 4.5, numAvaliacoes: 18, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 6, nome: "Fernanda Exemplo Alves", categoriaId: "costureira", cidadeId: "fortaleza", bairro: "Benfica",
    descricao: "Perfil demonstrativo. Ajustes e confecção de roupas simulados para o protótipo acadêmico.",
    servicos: ["Ajuste de roupas (demo)", "Confecção sob medida (demo)", "Reparos em geral"],
    avaliacao: 4.9, numAvaliacoes: 27, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 7, nome: "Lucas Exemplo Martins", categoriaId: "pintor", cidadeId: "fortaleza", bairro: "Antônio Bezerra",
    descricao: "Exemplo fictício de pintor autônomo para fins de teste do sistema RedeTrampo.",
    servicos: ["Pintura interna e externa (demo)", "Textura e grafiato (demo)", "Pintura de portões"],
    avaliacao: 4.4, numAvaliacoes: 15, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 8, nome: "Patrícia Exemplo Rocha", categoriaId: "fotografo", cidadeId: "fortaleza", bairro: "Praia de Iracema",
    descricao: "Perfil fictício de fotografia para demonstração de funcionalidades do protótipo.",
    servicos: ["Ensaio fotográfico (demo)", "Cobertura de eventos (demo)", "Edição de imagens"],
    avaliacao: 4.8, numAvaliacoes: 22, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 9, nome: "Rafael Exemplo Nogueira", categoriaId: "encanador", cidadeId: "fortaleza", bairro: "Barra do Ceará",
    descricao: "Dados de demonstração. Simulação de serviço de encanamento residencial para testes do MVP.",
    servicos: ["Conserto de vazamentos (demo)", "Instalação de torneiras", "Desentupimento (demo)"],
    avaliacao: 4.6, numAvaliacoes: 19, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 10, nome: "Juliana Exemplo Ferreira", categoriaId: "designer", cidadeId: "fortaleza", bairro: "Meireles",
    descricao: "Perfil fictício. Criação de identidade visual simulada para validação do protótipo acadêmico.",
    servicos: ["Criação de logotipo (demo)", "Identidade visual (demo)", "Artes para redes sociais"],
    avaliacao: 4.7, numAvaliacoes: 12, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 11, nome: "Marcos Exemplo Teixeira", categoriaId: "eletricista", cidadeId: "fortaleza", bairro: "José Walter",
    descricao: "Exemplo de demonstração. Atendimento elétrico residencial e comercial simulado.",
    servicos: ["Instalação de chuveiro elétrico", "Troca de disjuntores", "Laudo elétrico (demo)"],
    avaliacao: 4.3, numAvaliacoes: 9, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 12, nome: "Beatriz Exemplo Cardoso", categoriaId: "diarista", cidadeId: "fortaleza", bairro: "Montese",
    descricao: "Perfil fictício de demonstração para a funcionalidade de busca por bairro/região em Fortaleza.",
    servicos: ["Limpeza residencial (demo)", "Passar roupa (demo)"],
    avaliacao: 4.9, numAvaliacoes: 31, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 13, nome: "Diego Exemplo Barbosa", categoriaId: "pedreiro", cidadeId: "fortaleza", bairro: "Edson Queiroz",
    descricao: "Dados simulados. Serviços de construção civil demonstrativos para o protótipo RedeTrampo.",
    servicos: ["Reforma de banheiro (demo)", "Assentamento de piso (demo)"],
    avaliacao: 4.5, numAvaliacoes: 14, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 14, nome: "Camila Exemplo Ribeiro", categoriaId: "cabeleireiro", cidadeId: "fortaleza", bairro: "Parquelândia",
    descricao: "Perfil de demonstração acadêmica. Serviços de beleza simulados.",
    servicos: ["Coloração (demo)", "Alongamento de cílios (demo)"],
    avaliacao: 4.6, numAvaliacoes: 24, telefone: "(85) 9xxxx-xxxx (exemplo)" },
  { id: 15, nome: "Eduardo Exemplo Moraes", categoriaId: "informatica", cidadeId: "fortaleza", bairro: "Cocó",
    descricao: "Exemplo fictício. Suporte técnico e montagem de computadores simulados no protótipo.",
    servicos: ["Montagem de PC (demo)", "Backup de dados (demo)", "Instalação de software"],
    avaliacao: 4.7, numAvaliacoes: 16, telefone: "(85) 9xxxx-xxxx (exemplo)" },
];

// ---------------------------------------------------------------------------
// Acesso aos dados
// Perfis de demonstração permanecem separados dos cadastros reais do Sheets.
// PROFISSIONAIS_API é preenchido por js/api.js quando a página carrega.
// ---------------------------------------------------------------------------
var PROFISSIONAIS_API = [];
const CHAVE_LOCALIZACAO = "redetrampo_localizacao_selecionada";

function obterTodosProfissionais() {
  return [...PROFISSIONAIS_DEMO, ...PROFISSIONAIS_API];
}

function obterProfissionalPorId(id) {
  return obterTodosProfissionais().find((p) => String(p.id) === String(id));
}

function obterCategoriaPorId(id) {
  return CATEGORIAS_DEMO.find((c) => c.id === id);
}

function obterCidadePorId(id) {
  return CIDADES_DEMO.find((c) => c.id === id);
}

function obterNomeCidade(id) {
  const cidade = obterCidadePorId(id);
  return cidade ? cidade.nome : "Fortaleza - CE";
}

function obterNomeCategoria(id) {
  const categoria = obterCategoriaPorId(id);
  return categoria ? categoria.nome : "Outros Serviços";
}

function salvarLocalizacaoSelecionada(cidadeId, bairro) {
  localStorage.setItem(CHAVE_LOCALIZACAO, JSON.stringify({ cidadeId, bairro: bairro || "" }));
}

function obterLocalizacaoSelecionada() {
  try {
    const dados = localStorage.getItem(CHAVE_LOCALIZACAO);
    return dados ? JSON.parse(dados) : null;
  } catch (e) {
    return null;
  }
}

function ehPerfilDeDemonstracao(profissional) {
  return Number.isInteger(Number(profissional && profissional.id)) &&
    Number(profissional.id) >= 1 && Number(profissional.id) <= 15;
}

/** Filtra perfis de demonstração e profissionais reais cadastrados na planilha. */
function filtrarProfissionais({ categoriaId, cidadeId, bairro, termo } = {}) {
  let lista = obterTodosProfissionais();

  if (categoriaId && categoriaId !== "todos") {
    lista = lista.filter((p) => p.categoriaId === categoriaId);
  }
  if (cidadeId && cidadeId !== "todos") {
    lista = lista.filter((p) => p.cidadeId === cidadeId);
  }
  if (bairro && bairro !== "todos") {
    lista = lista.filter((p) => p.bairro === bairro);
  }
  if (termo) {
    const termoBusca = termo.trim().toLocaleLowerCase("pt-BR");
    lista = lista.filter((p) => {
      const categoria = obterNomeCategoria(p.categoriaId).toLocaleLowerCase("pt-BR");
      const servicos = Array.isArray(p.servicos) ? p.servicos.join(" ") : "";
      return [p.nome, categoria, p.descricao, p.bairro, servicos]
        .join(" ")
        .toLocaleLowerCase("pt-BR")
        .includes(termoBusca);
    });
  }
  return lista;
}
