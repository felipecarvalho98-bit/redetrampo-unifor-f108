# Pacote de Entrega F108 — RedeTrampo

**Instituição:** UNIFOR — Universidade de Fortaleza | **Disciplina:** F108 — Desenvolvimento de Projeto Aplicado | **Professor:** Regis Patrick Silva
**Local e data:** Fortaleza — CE, 27 de novembro de 2026

**Equipe:** Ana Braveza Costa (2526931) · Cristiano Ferreira da Silva (2523556) · Rosalynne Praciano Pontes Braquehais (252670-3) · Augusto César de Freitas Vasconcelos Filho (2523536) · Felipe Bezerra Carvalho (2523543) · Samyle Ferreira de Freitas (2425102)

> ⚠️ Todos os campos destacados em <span style="color:red">vermelho</span>, em qualquer documento desta pasta, dependem de execução humana real (testes com os 10 participantes, fotografias, respostas, assinaturas) e **não foram preenchidos nem simulados**, conforme exigido.

## Índice de pastas

| Pasta | Conteúdo |
|---|---|
| `01-Relatorio/` | Relatório acadêmico completo (editável) e documento de requisitos funcionais/não funcionais |
| `02-Planejamento-e-Sprints/` | Backlog, as 4 Sprints, quadro Kanban e plano de validação/métricas |
| `03-Questionarios/` | Questionários de entrevista/validação e roteiro de tarefas de teste |
| `04-Planilhas-e-Graficos/` | Planilha de coleta interativa, com cálculo automático de indicadores e gráfico (Chart.js) |
| `05-Evidencias/` | Checklist de evidências, modelo de registro dos 10 testes e modelo para fotografias/registros |
| `06-Documentos-Participantes/` | Divisão de tarefas e responsabilidades por integrante |
| `07-Entrega-Final/` | Guia de utilização do protótipo e checklist final de entrega |

## O que já está pronto
- Protótipo RedeTrampo (7 telas) integrado ao Google Sheets por Apps Script e função serverless no Vercel. A execução dos testes oficiais continua pendente.
- Todos os modelos, instrumentos e estrutura de documentos acima.
- Identificação acadêmica completa e consistente em todos os arquivos.
- Divisão de responsabilidades aplicada aos 5 integrantes informados.

## O que depende de ação humana (marcado em vermelho nos documentos)
- Execução real dos testes com os 10 participantes (5 profissionais + 5 clientes).
- Respostas reais dos questionários e preenchimento da planilha.
- Fotografias/capturas reais das atividades.
- Cálculo dos indicadores reais e comparação com as metas.
- Contribuições individuais e assinaturas de cada integrante.
- Definição da área de responsabilidade de Samyle Ferreira de Freitas (não informada).
- Geração do ZIP final **após** esses itens, via download do projeto na plataforma.


## Nota técnica da versão integrada

A versão atualizada substitui o armazenamento local de cadastros, solicitações e avaliações por uma base compartilhada no Google Sheets. A integração utiliza Google Apps Script como camada de dados e uma função `/api` do Vercel como intermediária. A localização selecionada pelo visitante permanece armazenada apenas no navegador. O telefone do profissional é mantido na aba privada `Profissionais` e não é retornado pela API pública. As solicitações são registradas para consulta da equipe, sem envio automático de mensagens ao profissional.

Esta alteração técnica não representa validação de usabilidade concluída: o roteiro com 10 participantes reais, questionários, evidências e métricas reais permanece pendente até a aplicação efetiva.
