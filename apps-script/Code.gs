/**
 * RedeTrampo - API do Google Apps Script
 * A planilha funciona como armazenamento do MVP acadêmico.
 * O token de acesso deve ser salvo em Propriedades do script (API_TOKEN),
 * nunca diretamente neste arquivo ou no GitHub.
 */

const CONFIG = {
  SPREADSHEET_ID: '1CRQNi_tEYsbs3ssenPzW5fHxH0of7Uq-gQJEv7bEIpc',
  ABA_PROFISSIONAIS: 'Profissionais',
  ABA_SOLICITACOES: 'Solicitacoes',
  ABA_AVALIACOES: 'Avaliacoes',
  BAIRROS_FORTALEZA: [
    'Centro', 'Aldeota', 'Meireles', 'Papicu', 'Cocó', 'Messejana',
    'Parangaba', 'Antônio Bezerra', 'Barra do Ceará', 'Montese',
    'José Walter', 'Benfica', 'Parquelândia', 'Praia de Iracema', 'Edson Queiroz'
  ],
  CATEGORIAS: [
    'eletricista', 'encanador', 'pedreiro', 'pintor', 'costureira',
    'diarista', 'cabeleireiro', 'informatica', 'fotografo', 'designer', 'outros'
  ]
};

const CABECALHOS = {
  Profissionais: [
    'id', 'nome', 'telefone_privado', 'categoriaId', 'cidadeId', 'bairro',
    'descricao', 'servicos_json', 'status', 'dataCadastro', 'consentimento'
  ],
  Solicitacoes: [
    'id', 'profissionalId', 'nomeCliente', 'telefoneCliente', 'tipoSolicitacao',
    'mensagem', 'status', 'dataSolicitacao', 'consentimento'
  ],
  Avaliacoes: [
    'id', 'profissionalId', 'nota', 'comentario', 'dataAvaliacao', 'status', 'consentimento'
  ]
};

/** Execute uma vez manualmente para criar as abas e os cabeçalhos. */
function configurarBancoRedeTrampo() {
  const planilha = abrirPlanilha_();
  Object.keys(CABECALHOS).forEach(function (nomeAba) {
    let aba = planilha.getSheetByName(nomeAba);
    if (!aba) aba = planilha.insertSheet(nomeAba);

    if (aba.getLastRow() === 0) {
      aba.getRange(1, 1, 1, CABECALHOS[nomeAba].length)
        .setValues([CABECALHOS[nomeAba]]);
      aba.setFrozenRows(1);
      aba.getRange(1, 1, 1, CABECALHOS[nomeAba].length)
        .setFontWeight('bold')
        .setBackground('#123b70')
        .setFontColor('#ffffff');
      aba.autoResizeColumns(1, CABECALHOS[nomeAba].length);
      if (!aba.getFilter()) aba.getRange(1, 1, Math.max(aba.getMaxRows(), 2), CABECALHOS[nomeAba].length).createFilter();
    }
  });
  // Telefones são tratados como texto para preservar a formatação digitada.
  planilha.getSheetByName(CONFIG.ABA_PROFISSIONAIS).getRange('C:C').setNumberFormat('@');
  planilha.getSheetByName(CONFIG.ABA_SOLICITACOES).getRange('D:D').setNumberFormat('@');
  planilha.getSheetByName(CONFIG.ABA_PROFISSIONAIS).getRange('J:J').setNumberFormat('dd/MM/yyyy HH:mm');
  planilha.getSheetByName(CONFIG.ABA_SOLICITACOES).getRange('H:H').setNumberFormat('dd/MM/yyyy HH:mm');
  planilha.getSheetByName(CONFIG.ABA_AVALIACOES).getRange('E:E').setNumberFormat('dd/MM/yyyy HH:mm');
  return 'Abas Profissionais, Solicitacoes e Avaliacoes conferidas/criadas.';
}

/** Endpoint chamado somente pela função serverless do Vercel. */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return respostaJson_({ ok: false, error: 'Requisição vazia.' });
    }

    const dados = JSON.parse(e.postData.contents);
    const tokenSalvo = PropertiesService.getScriptProperties().getProperty('API_TOKEN');
    if (!tokenSalvo || dados.token !== tokenSalvo) {
      return respostaJson_({ ok: false, error: 'Acesso não autorizado.' });
    }

    const acao = String(dados.action || '');
    let resultado;

    switch (acao) {
      case 'listarProfissionais':
        resultado = listarProfissionais_();
        break;
      case 'cadastrarProfissional':
        resultado = cadastrarProfissional_(dados);
        break;
      case 'registrarSolicitacao':
        resultado = registrarSolicitacao_(dados);
        break;
      case 'listarAvaliacoes':
        resultado = listarAvaliacoes_(dados.profissionalId);
        break;
      case 'registrarAvaliacao':
        resultado = registrarAvaliacao_(dados);
        break;
      default:
        throw new Error('Ação não reconhecida.');
    }

    return respostaJson_({ ok: true, ...resultado });
  } catch (erro) {
    console.error(erro);
    return respostaJson_({ ok: false, error: erro.message || 'Não foi possível processar a solicitação.' });
  }
}

function abrirPlanilha_() {
  if (!CONFIG.SPREADSHEET_ID || CONFIG.SPREADSHEET_ID.indexOf('COLE_AQUI') === 0) {
    throw new Error('Configure o ID da planilha no arquivo Code.gs.');
  }
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}

function obterAba_(nomeAba) {
  const planilha = abrirPlanilha_();
  const aba = planilha.getSheetByName(nomeAba);
  if (!aba) throw new Error('A aba ' + nomeAba + ' não existe. Execute configurarBancoRedeTrampo().');
  return aba;
}

function respostaJson_(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}

function texto_(valor, limite) {
  const valorTratado = String(valor == null ? '' : valor).trim();
  if (!valorTratado) throw new Error('Preencha todos os campos obrigatórios.');
  if (valorTratado.length > limite) throw new Error('Um dos campos ultrapassou o tamanho permitido.');
  // Prefixa texto potencialmente interpretado como fórmula pelo Google Sheets.
  return /^[=+@\-]/.test(valorTratado) ? "'" + valorTratado : valorTratado;
}

function telefone_(valor) {
  let numero = String(valor == null ? '' : valor).replace(/\D/g, '');
  if ((numero.length === 12 || numero.length === 13) && numero.indexOf('55') === 0) {
    numero = numero.substring(2);
  }
  if (numero.length !== 10 && numero.length !== 11) {
    throw new Error('Informe um telefone com DDD e 10 ou 11 dígitos.');
  }
  return numero;
}

function exigirConsentimento_(valor) {
  if (valor !== true && String(valor).toLowerCase() !== 'true' && String(valor).toLowerCase() !== 'sim') {
    throw new Error('É necessário aceitar o aviso de privacidade para continuar.');
  }
}

function anexarLinhaSegura_(nomeAba, linha) {
  const bloqueio = LockService.getScriptLock();
  bloqueio.waitLock(10000);
  try {
    obterAba_(nomeAba).appendRow(linha);
  } finally {
    bloqueio.releaseLock();
  }
}

function lerObjetos_(nomeAba) {
  const valores = obterAba_(nomeAba).getDataRange().getValues();
  if (valores.length < 2) return [];
  const cabecalhos = valores[0].map(function (v) { return String(v); });
  return valores.slice(1).filter(function (linha) {
    return linha.some(function (v) { return v !== '' && v != null; });
  }).map(function (linha) {
    const objeto = {};
    cabecalhos.forEach(function (chave, i) { objeto[chave] = linha[i]; });
    return objeto;
  });
}

function formatarData_(valor) {
  if (valor instanceof Date) return valor.toISOString();
  return String(valor || '');
}

function listarProfissionais_() {
  const profissionais = lerObjetos_(CONFIG.ABA_PROFISSIONAIS)
    .filter(function (p) { return String(p.status || 'Ativo').toLowerCase() === 'ativo'; });
  const avaliacoes = lerObjetos_(CONFIG.ABA_AVALIACOES)
    .filter(function (a) { return String(a.status || 'Publicado').toLowerCase() === 'publicado'; });

  const agrupadas = {};
  avaliacoes.forEach(function (a) {
    const id = String(a.profissionalId || '');
    if (!agrupadas[id]) agrupadas[id] = { soma: 0, total: 0 };
    agrupadas[id].soma += Number(a.nota) || 0;
    agrupadas[id].total += 1;
  });

  const lista = profissionais.map(function (p) {
    const id = String(p.id || '');
    const grupo = agrupadas[id] || { soma: 0, total: 0 };
    let servicos = [];
    try { servicos = JSON.parse(String(p.servicos_json || '[]')); } catch (e) { servicos = []; }

    return {
      id: id,
      nome: String(p.nome || ''),
      categoriaId: String(p.categoriaId || ''),
      cidadeId: 'fortaleza',
      bairro: String(p.bairro || ''),
      descricao: String(p.descricao || ''),
      servicos: Array.isArray(servicos) ? servicos : [],
      avaliacao: grupo.total ? Number((grupo.soma / grupo.total).toFixed(1)) : 0,
      numAvaliacoes: grupo.total,
      origem: 'cadastro'
      // telefone_privado não é devolvido ao navegador.
    };
  });
  return { profissionais: lista };
}

function cadastrarProfissional_(dados) {
  exigirConsentimento_(dados.consentimento);
  const nome = texto_(dados.nome, 90);
  const telefone = telefone_(dados.telefone);
  const categoriaId = texto_(dados.categoriaId, 40);
  const bairro = texto_(dados.bairro, 80);
  const descricao = texto_(dados.descricao, 700);

  if (CONFIG.CATEGORIAS.indexOf(categoriaId) === -1) throw new Error('Selecione uma categoria válida.');
  if (CONFIG.BAIRROS_FORTALEZA.indexOf(bairro) === -1) throw new Error('Selecione um bairro válido de Fortaleza.');

  let servicos = dados.servicos;
  if (!Array.isArray(servicos)) servicos = [];
  servicos = servicos.map(function (s) { return String(s).trim(); })
    .filter(function (s) { return s.length > 0; }).slice(0, 10);
  if (servicos.length === 0) throw new Error('Informe pelo menos um serviço oferecido.');
  if (servicos.some(function (s) { return s.length > 90; })) throw new Error('Cada serviço deve ter até 90 caracteres.');

  const id = 'RT-' + Utilities.getUuid();
  const dataCadastro = new Date();
  anexarLinhaSegura_(CONFIG.ABA_PROFISSIONAIS, [
    id, nome, telefone, categoriaId, 'fortaleza', bairro, descricao,
    JSON.stringify(servicos), 'Ativo', dataCadastro, 'SIM'
  ]);
  return { profissional: { id: id, nome: nome }, mensagem: 'Cadastro salvo com sucesso.' };
}

function registrarSolicitacao_(dados) {
  exigirConsentimento_(dados.consentimento);
  const profissionalId = texto_(dados.profissionalId, 100);
  const nomeCliente = texto_(dados.nomeCliente, 90);
  const telefoneCliente = telefone_(dados.telefoneCliente);
  const tipoSolicitacao = texto_(dados.tipoSolicitacao, 30);
  const mensagem = texto_(dados.mensagem, 1200);
  const tiposPermitidos = ['orcamento', 'duvida', 'agendamento'];
  if (tiposPermitidos.indexOf(tipoSolicitacao) === -1) throw new Error('Selecione um tipo de solicitação válido.');

  const id = 'SOL-' + Utilities.getUuid();
  anexarLinhaSegura_(CONFIG.ABA_SOLICITACOES, [
    id, profissionalId, nomeCliente, telefoneCliente, tipoSolicitacao,
    mensagem, 'Nova', new Date(), 'SIM'
  ]);
  return { solicitacaoId: id, mensagem: 'Solicitação registrada com sucesso.' };
}

function listarAvaliacoes_(profissionalId) {
  const id = texto_(profissionalId, 100);
  const avaliacoes = lerObjetos_(CONFIG.ABA_AVALIACOES)
    .filter(function (a) {
      return String(a.profissionalId) === id && String(a.status || 'Publicado').toLowerCase() === 'publicado';
    })
    .map(function (a) {
      return {
        nota: Number(a.nota) || 0,
        comentario: String(a.comentario || ''),
        data: formatarData_(a.dataAvaliacao)
      };
    });
  return { avaliacoes: avaliacoes };
}

function registrarAvaliacao_(dados) {
  exigirConsentimento_(dados.consentimento);
  const profissionalId = texto_(dados.profissionalId, 100);
  const nota = Number(dados.nota);
  if (!Number.isInteger(nota) || nota < 1 || nota > 5) throw new Error('A nota deve ser de 1 a 5 estrelas.');
  let comentario = String(dados.comentario || '').trim();
  if (comentario.length > 500) throw new Error('O comentário deve ter até 500 caracteres.');
  if (/^[=+@\-]/.test(comentario)) comentario = "'" + comentario;

  const id = 'AVA-' + Utilities.getUuid();
  anexarLinhaSegura_(CONFIG.ABA_AVALIACOES, [
    id, profissionalId, nota, comentario, new Date(), 'Publicado', 'SIM'
  ]);
  return { avaliacaoId: id, mensagem: 'Avaliação registrada com sucesso.' };
}
