/*
 * RedeTrampo - comunicação com a API hospedada no Vercel.
 * O navegador chama /api/redetrampo. O token privado fica somente no servidor.
 */
(function () {
  const ENDPOINT_API = '/api/redetrampo';

  async function requisitarAPI(action, dados = {}) {
    let resposta;
    try {
      resposta = await fetch(ENDPOINT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...dados })
      });
    } catch (erro) {
      throw new Error('Não foi possível conectar à API. Abra o projeto pelo Vercel ou por "vercel dev".');
    }

    let resultado;
    try {
      resultado = await resposta.json();
    } catch (erro) {
      throw new Error('A API retornou uma resposta inválida. Confira a implantação no Vercel.');
    }

    if (!resposta.ok || !resultado.ok) {
      throw new Error(resultado.error || 'Não foi possível concluir a operação.');
    }
    return resultado;
  }

  window.RedeTrampoAPI = {
    requisitar: requisitarAPI,

    async carregarProfissionais() {
      const resultado = await requisitarAPI('listarProfissionais');
      PROFISSIONAIS_API = Array.isArray(resultado.profissionais) ? resultado.profissionais : [];
      return PROFISSIONAIS_API;
    },

    async cadastrarProfissional(profissional) {
      return requisitarAPI('cadastrarProfissional', profissional);
    },

    async registrarSolicitacao(solicitacao) {
      return requisitarAPI('registrarSolicitacao', solicitacao);
    },

    async listarAvaliacoes(profissionalId) {
      const resultado = await requisitarAPI('listarAvaliacoes', { profissionalId });
      return Array.isArray(resultado.avaliacoes) ? resultado.avaliacoes : [];
    },

    async registrarAvaliacao(avaliacao) {
      return requisitarAPI('registrarAvaliacao', avaliacao);
    }
  };
})();
