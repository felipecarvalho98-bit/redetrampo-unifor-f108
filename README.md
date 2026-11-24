# RedeTrampo — MVP acadêmico F108 (versão integrada ao Google Sheets)

**Instituição:** UNIFOR — Universidade de Fortaleza  
**Disciplina:** F108 — Desenvolvimento de Projeto Aplicado  
**Escopo:** profissionais autônomos e potenciais clientes em Fortaleza - CE  
**ODS relacionada:** ODS 8 — Trabalho Decente e Crescimento Econômico

Esta versão mantém as sete telas originais e substitui o armazenamento local dos formulários por uma API no Vercel que conversa com Google Apps Script e Google Sheets.

## O que foi integrado

- Cadastro profissional: salva dados na aba `Profissionais`.
- Pesquisa e resultados: combinam os perfis fictícios de exemplo com os profissionais reais cadastrados na planilha.
- Perfil profissional: carrega os dados do cadastro e as avaliações compartilhadas.
- Solicitação de contato/orçamento: grava o pedido na aba `Solicitacoes`.
- Avaliações: são registradas e consultadas na aba `Avaliacoes`.
- Telefone do profissional não é devolvido pela API pública e não aparece no perfil público.
- Os perfis fictícios continuam disponíveis, mas são identificados como exemplos.
- O campo de consentimento explica o uso acadêmico dos dados antes do envio.

**Importante:** o sistema registra solicitações na planilha, mas não envia WhatsApp, SMS ou e-mail automaticamente ao profissional. A equipe pode consultar os registros na aba `Solicitacoes`.

## Arquitetura

`Páginas HTML/JS -> /api/redetrampo (Vercel) -> Google Apps Script -> Google Sheets`

O token privado fica em variável de ambiente do Vercel e em Propriedades do script do Apps Script. Ele não deve ser inserido nos arquivos HTML/JS nem enviado ao GitHub.

## 1. Preparar o Google Sheets

A planilha informada pelo grupo é:

`https://docs.google.com/spreadsheets/d/1CRQNi_tEYsbs3ssenPzW5fHxH0of7Uq-gQJEv7bEIpc/edit`

O ID já deve ser copiado para `SPREADSHEET_ID` em `apps-script/Code.gs`:

`1CRQNi_tEYsbs3ssenPzW5fHxH0of7Uq-gQJEv7bEIpc`

Crie as abas (ou deixe o script criá-las):

### Aba `Profissionais`

| Coluna | Cabeçalho | Uso |
|---|---|---|
| A | id | Identificador gerado pelo sistema |
| B | nome | Nome público/nome fantasia |
| C | telefone_privado | Telefone de contato, não exibido na busca pública |
| D | categoriaId | Categoria selecionada |
| E | cidadeId | `fortaleza` |
| F | bairro | Bairro de Fortaleza |
| G | descricao | Apresentação do profissional |
| H | servicos_json | Lista de serviços em formato JSON |
| I | status | `Ativo` ou `Inativo` |
| J | dataCadastro | Data/hora de cadastro |
| K | consentimento | Registro do consentimento |

### Aba `Solicitacoes`

| Coluna | Cabeçalho | Uso |
|---|---|---|
| A | id | Protocolo gerado pelo sistema |
| B | profissionalId | Perfil escolhido pelo cliente |
| C | nomeCliente | Nome informado pelo cliente |
| D | telefoneCliente | Telefone para retorno |
| E | tipoSolicitacao | `orcamento`, `duvida` ou `agendamento` |
| F | mensagem | Descrição da necessidade |
| G | status | Começa como `Nova`; a equipe pode atualizar manualmente |
| H | dataSolicitacao | Data/hora do registro |
| I | consentimento | Registro do consentimento |

### Aba `Avaliacoes`

| Coluna | Cabeçalho | Uso |
|---|---|---|
| A | id | Identificador da avaliação |
| B | profissionalId | Perfil avaliado |
| C | nota | Nota de 1 a 5 |
| D | comentario | Comentário opcional |
| E | dataAvaliacao | Data/hora |
| F | status | `Publicado` por padrão; `Oculta` não aparece ao público |
| G | consentimento | Confirma autorização de exibição da avaliação |

**Não renomeie as abas nem os cabeçalhos.** O sistema procura esses nomes exatamente. Mantenha a planilha com acesso restrito à equipe responsável; não publique a planilha como aberta na internet, pois ela contém telefones e mensagens privadas.

## 2. Criar a API no Google Apps Script

1. Abra `https://script.google.com/` usando a conta que é proprietária da planilha.
2. Crie um projeto novo, por exemplo `RedeTrampo API`.
3. Abra o arquivo `apps-script/Code.gs` deste pacote e copie o conteúdo inteiro para o editor do Apps Script.
4. No início do código, confirme que `SPREADSHEET_ID` está preenchido com o ID da planilha acima, sem espaços e sem a URL completa.
5. Salve o projeto.
6. No menu lateral, abra **Configurações do projeto** (ícone de engrenagem).
7. Em **Propriedades do script**, adicione uma propriedade:
   - Nome: `API_TOKEN`
   - Valor: crie uma sequência longa e aleatória, com pelo menos 32 caracteres. Exemplo de geração no PowerShell: `[guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N')`.
8. Copie o valor do token para um local privado. Você usará exatamente o mesmo no Vercel. Não o coloque em nenhum arquivo versionado.
9. No seletor de funções, selecione `configurarBancoRedeTrampo` e clique em **Executar**.
10. Autorize o acesso à planilha. Volte ao Google Sheets e confira se foram criadas as abas `Profissionais`, `Solicitacoes` e `Avaliacoes` com seus cabeçalhos.
11. No Apps Script, clique em **Implantar > Nova implantação**.
12. Selecione o tipo **Aplicativo da Web**.
13. Configure para **Executar como: Eu** e acesso **Qualquer pessoa** (incluindo pessoas sem login, se essa for a opção mostrada pela conta). O token valida as chamadas feitas pelo Vercel.
14. Clique em **Implantar**, autorize se solicitado e copie a URL terminada em `/exec`.

Se alterar o código `Code.gs` depois da implantação, use **Implantar > Gerenciar implantações > Editar > Nova versão > Implantar**. A alteração de uma propriedade `API_TOKEN` não exige nova versão do código.

## 3. Configurar o projeto no computador

1. Extraia este ZIP em uma pasta, por exemplo `C:\Projetos\redetrampo`.
2. Abra a pasta no VS Code (**Arquivo > Abrir Pasta**).
3. Copie `.env.example` para um arquivo chamado `.env.local`.
4. Abra `.env.local` e configure:

```env
GAS_WEB_APP_URL=https://script.google.com/macros/s/SEU_ID_DE_IMPLANTACAO/exec
REDETRAMPO_API_TOKEN=O_MESMO_TOKEN_CRIADO_NAS_PROPRIEDADES_DO_APPS_SCRIPT
```

5. Não compartilhe nem envie `.env.local` ao GitHub. Ele já está no `.gitignore`.

## 4. Testar localmente

O projeto usa uma função serverless dentro da pasta `api`. Por isso, não abra apenas o `index.html` por `file://` ou pelo Live Server: esse modo não executa `/api/redetrampo`.

1. Instale o Node.js LTS, caso ainda não tenha.
2. Abra o terminal do VS Code na raiz da pasta do projeto.
3. Instale a CLI do Vercel:

```bash
npm install -g vercel
```

4. Entre na conta:

```bash
vercel login
```

5. Inicie o servidor local:

```bash
vercel dev
```

6. Abra o endereço local que o terminal informar (normalmente `http://localhost:3000`).

Se o Vercel solicitar para vincular um projeto, é possível responder que deseja configurar o projeto local ou criar um projeto de teste. O `.env.local` precisa estar na raiz do projeto.

## 5. Teste funcional antes de divulgar

Faça os testes abaixo com a equipe primeiro:

1. Abra `cadastro-profissional.html`, cadastre um profissional fictício de teste e marque o consentimento.
2. Confira se a linha apareceu na aba `Profissionais`.
3. Abra `resultados.html`, pesquise a categoria e bairro do cadastro e confirme se o novo perfil aparece.
4. Abra o perfil e confirme que o telefone não aparece na página pública.
5. Envie uma avaliação e confirme a linha na aba `Avaliacoes`.
6. Pelo perfil, abra a solicitação de contato, envie uma solicitação de teste e confirme a linha na aba `Solicitacoes`.
7. Teste campos obrigatórios vazios, telefone inválido e ausência de consentimento.
8. Na aba `Profissionais`, altere `status` para `Inativo` e confirme que o perfil deixa de aparecer nos resultados após recarregar a página.

Apague os registros de teste da equipe antes de iniciar a coleta oficial, ou identifique-os claramente como testes internos. Não conte esses cadastros como participantes voluntários.

## 6. Enviar para o GitHub

Crie um repositório novo, por exemplo `redetrampo-unifor-f108`. Não use o repositório do Mercadinho Ponto Certo, pois são projetos diferentes.

No terminal do VS Code, na pasta raiz:

```bash
git init
git add .
git commit -m "Primeira versão do RedeTrampo integrada ao Google Sheets"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/redetrampo-unifor-f108.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu usuário do GitHub. Se a pasta já tiver um repositório Git inicializado, não execute `git init` novamente; verifique antes com `git status` e `git remote -v`.

## 7. Publicar no Vercel

1. Abra `https://vercel.com/` e entre com sua conta.
2. Clique em **Add New > Project**.
3. Importe o repositório `redetrampo-unifor-f108` do GitHub.
4. Para este projeto estático com função `/api`, selecione **Other** se o Vercel pedir um framework. Não configure um comando de build próprio; a função Node.js fica na pasta `api`.
5. Antes de publicar, abra **Environment Variables** e crie:
   - `GAS_WEB_APP_URL` = URL `/exec` do Apps Script.
   - `REDETRAMPO_API_TOKEN` = mesmo token salvo nas Propriedades do Apps Script.
6. Marque os ambientes **Production**, **Preview** e **Development**.
7. Clique em **Deploy**.
8. Quando terminar, abra o domínio `*.vercel.app` criado e teste o fluxo de cadastro e solicitação.

Sempre que enviar alterações para a branch `main`, o Vercel pode criar uma nova implantação automática, desde que a integração Git esteja ativa.

## 8. Fluxo de validação F108

O plano de validação que acompanha o pacote prevê **10 participantes reais**: 5 profissionais autônomos e 5 potenciais clientes. A equipe deve aplicar o roteiro e os questionários individualmente, observar sem conduzir a pessoa e registrar somente respostas reais.

As metas propostas no plano atual são:

| Métrica | Meta proposta |
|---|---:|
| Conclusão do cadastro profissional sem ajuda | ≥ 80% |
| Sucesso na pesquisa por categoria/bairro | ≥ 80% |
| Localização e uso da opção de contato | ≥ 90% |
| Facilidade de navegação (nota média 1 a 5) | ≥ 4,0 |
| Intenção de utilizar/recomendar | ≥ 70% |

Esses números são **metas, não resultados**. Após os testes, registrem os valores reais na planilha de métricas, criem os gráficos e comparem os resultados com as metas. A atividade F108 pede plano e execução da validação, com mínimo de 10 usuários e evidências.

### Organização dos voluntários

- Profissionais: cadastrar um perfil real somente com consentimento explícito; explicar que o cadastro será usado no protótipo acadêmico.
- Clientes: pedir que encontrem um profissional de uma categoria e bairro, abram um perfil e enviem uma solicitação simulada.
- Evidências: prints das tarefas (sem expor telefone, endereço ou mensagens privadas), fotos de aplicação com autorização e registros dos questionários.
- Não inventar participantes, respostas, tempos, conclusões ou resultados de métricas.

## Segurança e limites do protótipo

- Este é um MVP acadêmico, não uma plataforma de contratação ou pagamento.
- Os telefones de profissionais e clientes e as mensagens de solicitação ficam em abas privadas da planilha. Não torne essa planilha pública.
- O telefone do profissional não é devolvido pela API pública nem exibido no perfil.
- Não solicite documentos, senhas, dados bancários, CPF ou dados sensíveis.
- Solicitações são registradas na planilha; não existe envio automático de mensagens ao profissional.
- O token privado só deve ficar nas Propriedades do Apps Script e nas variáveis de ambiente do Vercel.
- Para uso real e em escala, será necessário reforçar autenticação, anti-spam, moderação, controle de acesso, retenção e exclusão de dados, consentimento/privacidade e segurança operacional.
