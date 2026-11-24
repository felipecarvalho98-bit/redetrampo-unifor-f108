/* ==========================================================================
   RedeTrampo — Funções compartilhadas de interface (menu, navegação, utilidades)
   ========================================================================== */

// Alterna o menu de navegação em telas pequenas (RNF02 - responsividade)
function alternarMenu() {
  const nav = document.getElementById("navPrincipal");
  if (nav) nav.classList.toggle("aberto");
}

// Marca o link ativo no menu conforme a página atual (RNF05 - navegação consistente)
function marcarLinkAtivo() {
  const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-principal a[data-pagina]").forEach((link) => {
    if (link.getAttribute("data-pagina") === paginaAtual) {
      link.classList.add("ativo");
    }
  });
}

// Lê parâmetros da URL (usado na navegação entre telas)
function obterParametroUrl(nome) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nome);
}

// Gera o HTML de estrelas de avaliação (somente leitura) a partir de uma nota 0-5
function gerarEstrelasHtml(nota) {
  const notaArred = Math.round(nota || 0);
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += i <= notaArred
      ? '<i class="fa-solid fa-star"></i>'
      : '<i class="fa-regular fa-star vazia"></i>';
  }
  return html;
}

// Preenche um <select> de cidades a partir de CIDADES_DEMO
function preencherSelectCidades(select, incluirTodas) {
  if (!select) return;
  select.innerHTML = "";
  if (incluirTodas) {
    const opt = document.createElement("option");
    opt.value = "todos";
    opt.textContent = "Todas as cidades";
    select.appendChild(opt);
  } else {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "Selecione a cidade";
    select.appendChild(opt);
  }
  CIDADES_DEMO.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.nome;
    select.appendChild(opt);
  });
}

// Preenche um <select> de bairros com base na cidade escolhida
function preencherSelectBairros(select, cidadeId, incluirTodos) {
  if (!select) return;
  select.innerHTML = "";
  const primeira = document.createElement("option");
  if (incluirTodos) {
    primeira.value = "todos";
    primeira.textContent = "Todos os bairros/regiões";
  } else {
    primeira.value = "";
    primeira.textContent = "Selecione o bairro/região";
  }
  select.appendChild(primeira);

  const cidade = obterCidadePorId(cidadeId);
  if (cidade) {
    cidade.bairros.forEach((b) => {
      const opt = document.createElement("option");
      opt.value = b;
      opt.textContent = b;
      select.appendChild(opt);
    });
    select.disabled = false;
  } else {
    select.disabled = true;
  }
}

// Validação simples de campo obrigatório; aplica/retira classes e mensagens de erro
function validarCampoObrigatorio(campo, mensagemElementoId, mensagemPersonalizada) {
  const msgEl = document.getElementById(mensagemElementoId);
  const valor = (campo.value || "").trim();
  if (!valor) {
    campo.classList.add("campo-invalido");
    if (msgEl) msgEl.textContent = mensagemPersonalizada || "Este campo é obrigatório.";
    return false;
  }
  campo.classList.remove("campo-invalido");
  if (msgEl) msgEl.textContent = "";
  return true;
}

function validarSelecao(campo, mensagemElementoId, mensagemPersonalizada) {
  const msgEl = document.getElementById(mensagemElementoId);
  if (!campo.value || campo.value === "" || campo.value === "todos") {
    campo.classList.add("campo-invalido");
    if (msgEl) msgEl.textContent = mensagemPersonalizada || "Selecione uma opção.";
    return false;
  }
  campo.classList.remove("campo-invalido");
  if (msgEl) msgEl.textContent = "";
  return true;
}

// Validação de e-mail simples (formato) — opcional, usado quando o campo é e-mail
function validarEmail(campo, mensagemElementoId) {
  const msgEl = document.getElementById(mensagemElementoId);
  const valor = (campo.value || "").trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!valor || !regex.test(valor)) {
    campo.classList.add("campo-invalido");
    if (msgEl) msgEl.textContent = "Informe um e-mail válido (ex: nome@exemplo.com).";
    return false;
  }
  campo.classList.remove("campo-invalido");
  if (msgEl) msgEl.textContent = "";
  return true;
}

document.addEventListener("DOMContentLoaded", marcarLinkAtivo);


// Escapa textos que vieram de formulários antes de inserir em HTML.
function escaparHtml(valor) {
  return String(valor == null ? "" : valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
