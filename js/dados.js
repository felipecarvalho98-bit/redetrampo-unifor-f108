/* ==========================================================================
   RedeTrampo — Dados de apoio do protótipo acadêmico
   Categorias e bairros são opções fixas de pesquisa. Os profissionais exibidos
   no site vêm exclusivamente dos cadastros autorizados na base Google Sheets.
   ========================================================================== */

// ---------------------------------------------------------------------------
// Cidade e bairros disponíveis para pesquisa (RF05)
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
// Acesso aos dados
// Somente profissionais cadastrados e autorizados na base são exibidos.
// PROFISSIONAIS_API é preenchido por js/api.js quando a página carrega.
// ---------------------------------------------------------------------------
var PROFISSIONAIS_API = [];
const CHAVE_LOCALIZACAO = "redetrampo_localizacao_selecionada";

function obterTodosProfissionais() {
  return [...PROFISSIONAIS_API];
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

/** Filtra somente profissionais cadastrados na planilha. */
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
