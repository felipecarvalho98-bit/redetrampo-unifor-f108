/**
 * Vercel Serverless Function: proxy seguro entre o navegador e o Apps Script.
 * Não coloque o token no JavaScript do navegador.
 */
const ACOES_PERMITIDAS = new Set([
  'listarProfissionais',
  'cadastrarProfissional',
  'registrarSolicitacao',
  'listarAvaliacoes',
  'registrarAvaliacao'
]);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Método não permitido.' });
  }

  const urlAppsScript = process.env.GAS_WEB_APP_URL;
  const token = process.env.REDETRAMPO_API_TOKEN;

  if (!urlAppsScript || !token) {
    return res.status(500).json({
      ok: false,
      error: 'A API ainda não foi configurada no Vercel. Confira as variáveis de ambiente.'
    });
  }

  let dados = req.body;
  if (typeof dados === 'string') {
    try { dados = JSON.parse(dados); }
    catch (erro) { return res.status(400).json({ ok: false, error: 'JSON inválido.' }); }
  }

  if (!dados || typeof dados !== 'object' || !ACOES_PERMITIDAS.has(String(dados.action || ''))) {
    return res.status(400).json({ ok: false, error: 'Ação inválida.' });
  }

  try {
    const resposta = await fetch(urlAppsScript, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...dados, token }),
      redirect: 'follow'
    });

    const texto = await resposta.text();
    let resultado;
    try { resultado = JSON.parse(texto); }
    catch (erro) {
      console.error('Resposta inesperada do Apps Script:', texto.slice(0, 500));
      return res.status(502).json({ ok: false, error: 'O Apps Script não retornou JSON. Confira a implantação da API.' });
    }

    if (!resposta.ok || !resultado.ok) {
      return res.status(400).json({ ok: false, error: resultado.error || 'A API recusou a operação.' });
    }

    return res.status(200).json(resultado);
  } catch (erro) {
    console.error('Falha ao chamar Apps Script:', erro);
    return res.status(502).json({ ok: false, error: 'Não foi possível conectar ao banco de dados. Tente novamente.' });
  }
};
