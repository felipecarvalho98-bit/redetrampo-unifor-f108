# Documento de Requisitos — RedeTrampo

**Disciplina:** F108 — Desenvolvimento de Projeto Aplicado
**Projeto:** RedeTrampo
**ODS relacionada:** ODS 8 — Trabalho Decente e Crescimento Econômico
**Tipo de entrega:** MVP (Minimum Viable Product) navegável, para fins de validação acadêmica

---

## 1. Identificação do Projeto

| Campo | Informação |
|---|---|
| Nome do projeto | RedeTrampo |
| Disciplina | F108 — Desenvolvimento de Projeto Aplicado |
| Instituição | UNIFOR — Universidade de Fortaleza |
| Professor(a) orientador(a) | Regis Patrick Silva |
| Local e data | Fortaleza — CE, 27 de novembro de 2026 |
| ODS relacionada | ODS 8 — Trabalho Decente e Crescimento Econômico |

### Equipe / Integrantes

| Nº | Nome | Matrícula |
|---|---|---|
| 1 | Ana Braveza Costa | 2526931 |
| 2 | Cristiano Ferreira da Silva | 2523556 |
| 3 | Rosalynne Praciano Pontes Braquehais | 252670-3 |
| 4 | Augusto César de Freitas Vasconcelos Filho | 2523536 |
| 5 | Felipe Bezerra Carvalho | 2523543 |
| 6 | Samyle Ferreira de Freitas | 2425102 |

---

## 2. Contextualização da ODS 8

A ODS 8 (Objetivo de Desenvolvimento Sustentável 8 da Agenda 2030 da ONU) trata de **"Trabalho Decente e Crescimento Econômico"**, propondo promover o crescimento econômico sustentado, inclusivo e sustentável, emprego pleno e produtivo, e trabalho decente para todos.

Profissionais autônomos — como eletricistas, encanadores, pedreiros, pintores, costureiras, diaristas, cabeleireiros, manicures, técnicos de informática, fotógrafos e designers — representam uma parcela relevante da força de trabalho, muitas vezes sem vínculo formal e com dificuldade de divulgar seus serviços de forma ampla e confiável. Facilitar o encontro entre esses profissionais e potenciais clientes contribui diretamente para a geração de renda, a formalização de oportunidades de trabalho e o fortalecimento da economia local, alinhando-se aos propósitos da ODS 8.

---

## 3. Problema e Justificativa

**Problema:** Profissionais autônomos de Fortaleza frequentemente dependem de indicação boca a boca ou de redes sociais genéricas para divulgar seus serviços, o que limita seu alcance a clientes de outros bairros da cidade e dificulta que clientes encontrem rapidamente um profissional confiável e próximo.

**Justificativa:** Uma plataforma simples, organizada por categoria de serviço e bairro/região dentro do município de Fortaleza - CE, reduz a fricção entre oferta e demanda de serviços autônomos, sem exigir conhecimento técnico avançado de nenhuma das partes. O escopo do MVP prioriza simplicidade, acessibilidade e baixo custo de manutenção, adequado à realidade de um projeto acadêmico, contemplando exclusivamente o município de Fortaleza, sem outras cidades ou regiões metropolitanas.

---

## 4. Público-Alvo

- **Profissionais autônomos** de diversas áreas: eletricistas, encanadores, pedreiros, pintores, costureiras, diaristas, cabeleireiros, manicures, técnicos de informática, fotógrafos, designers e outros prestadores de serviços.
- **Clientes/potenciais contratantes** que desejam pesquisar profissionais por bairro ou região dentro de Fortaleza - CE.

---

## 5. Objetivo Geral

Desenvolver um MVP de plataforma web responsiva que aproxime profissionais autônomos de potenciais clientes no município de Fortaleza - CE, permitindo a pesquisa por bairro e região, como contribuição aplicada à ODS 8.

## 6. Objetivos Específicos

1. Permitir que profissionais autônomos se cadastrem com dados profissionais básicos (categoria, bairro de atendimento em Fortaleza, descrição e serviços).
2. Organizar os profissionais por categorias de serviço.
3. Permitir que clientes pesquisem profissionais por bairro ou região dentro de Fortaleza.
4. Exibir perfis profissionais demonstrativos com informações relevantes para a decisão do cliente.
5. Oferecer um canal de solicitação de contato/orçamento demonstrativo entre cliente e profissional.
6. Garantir navegação simples, responsiva e acessível em celular, tablet e computador.
7. Validar a usabilidade do protótipo com usuários reais (profissionais e clientes).

---

## 7. Requisitos Funcionais (RF)

| Código | Requisito | Status no MVP |
|---|---|---|
| RF01 | O sistema deve permitir o cadastro de profissionais autônomos. | ✅ Implementado (tela "Cadastro profissional") |
| RF02 | O sistema deve permitir o preenchimento do perfil do profissional (nome público, descrição, região, etc.). | ✅ Implementado (formulário de cadastro + tela "Perfil profissional") |
| RF03 | O sistema deve permitir o cadastro dos serviços oferecidos pelo profissional. | ✅ Implementado (campo "Lista de serviços oferecidos") |
| RF04 | O sistema deve organizar os profissionais por categorias de serviço. | ✅ Implementado (tela "Categorias") |
| RF05 | O sistema deve permitir pesquisa de profissionais por bairro/região dentro de Fortaleza - CE. | ✅ Implementado (tela "Localização" + filtros na tela "Resultados"); escopo restrito ao município de Fortaleza |
| RF06 | O sistema deve exibir os perfis dos profissionais encontrados na pesquisa. | ✅ Implementado (tela "Perfil profissional") |
| RF07 | O sistema deve permitir que o cliente envie uma solicitação de contato ou orçamento. | ✅ Implementado (tela "Solicitação de contato") |
| RF08 | O sistema deve oferecer uma avaliação demonstrativa simples dos profissionais. | ✅ Implementado (avaliações na tela de perfil, armazenadas na aba privada `Avaliacoes` do Google Sheets) |

---

## 8. Requisitos Não Funcionais (RNF)

| Código | Requisito | Como foi atendido |
|---|---|---|
| RNF01 | Facilidade de uso | Navegação em poucos cliques, linguagem simples, botões e campos identificáveis. |
| RNF02 | Responsividade | Layout fluido com CSS Grid/Flexbox e *media queries* para celular, tablet e computador; menu adaptado (hambúrguer) em telas pequenas. |
| RNF03 | Linguagem acessível | Textos em português brasileiro, claros e objetivos, evitando termos técnicos desnecessários. |
| RNF04 | Proteção de informações | Não são solicitados documentos, senhas ou dados bancários. Nome, telefone e mensagem necessários ao fluxo são armazenados na planilha privada; o telefone do profissional não é exibido no perfil público. |
| RNF05 | Navegação consistente | Cabeçalho e rodapé padronizados em todas as telas, com item de menu ativo destacado e trilha de navegação (*breadcrumb*). |
| RNF06 | Legibilidade e acessibilidade visual | Contraste adequado entre texto e fundo, tipografia legível (Inter), tamanhos de fonte consistentes, indicadores de foco visíveis para navegação por teclado. |

---

## 9. Descrição do MVP

O MVP do RedeTrampo é composto por **sete telas** conectadas por navegação funcional:

1. **Página inicial** — apresentação da marca, busca rápida (categoria + bairro) e categorias em destaque.
2. **Localização** — seleção manual do bairro/região de Fortaleza - CE (sem uso de GPS ou mapas).
3. **Categorias** — lista de categorias de serviço com contagem de perfis de exemplo e cadastrados.
4. **Resultados** — listagem filtrável de perfis de exemplo e profissionais cadastrados (por categoria, bairro de Fortaleza e termo de busca).
5. **Perfil profissional** — dados do profissional, serviços oferecidos, região atendida e avaliações; perfis de exemplo são identificados como fictícios.
6. **Solicitação de contato** — formulário de interesse/orçamento com validação, consentimento e gravação na aba `Solicitacoes`; não há envio automático de mensagens.
7. **Cadastro profissional** — formulário para um profissional se cadastrar; o cadastro é gravado na aba `Profissionais` do Google Sheets.

### Tecnologias utilizadas

- HTML5, CSS3 e JavaScript puro (sem frameworks pagos ou bibliotecas pesadas).
- Ícones via Font Awesome (CDN gratuito) e fonte Google Fonts "Inter" (gratuita).
- Armazenamento compartilhado via Google Sheets, acessado pelo Apps Script e por uma função serverless do Vercel. A localização selecionada permanece no `localStorage`.
- Os perfis de exemplo são **fictícios**, claramente identificados como "demonstração". Cadastros realizados pelos voluntários são reais e só podem ser publicados com consentimento.

### Limitações técnicas assumidas (conforme regra HARD ULTRA)

- Não há geolocalização (GPS) nem mapas: a seleção de cidade/bairro é sempre manual, por listas pré-definidas.
- A solicitação de contato é registrada na planilha para acompanhamento da equipe; não há envio automático de mensagens, e-mails ou notificações ao profissional.
- Os cadastros de profissionais, solicitações e avaliações são compartilhados por meio da base Google Sheets. O telefone dos profissionais fica em coluna privada e não é devolvido pela API pública. A planilha deve permanecer restrita à equipe.
- Não há autenticação, login ou senha: o escopo evita coleta de dados sensíveis.

---

## 10. Rastreabilidade (Telas × Requisitos)

| Tela | RFs atendidos |
|---|---|
| Página inicial | RF04, RF05 (busca rápida) |
| Localização | RF05 |
| Categorias | RF04 |
| Resultados | RF05, RF06 |
| Perfil profissional | RF02, RF06, RF08 |
| Solicitação de contato | RF07 |
| Cadastro profissional | RF01, RF02, RF03 |
