# Guia Breve de Utilização — RedeTrampo (Protótipo)

**Instituição:** UNIFOR — Universidade de Fortaleza | **Disciplina:** F108 — Desenvolvimento de Projeto Aplicado | **Professor:** Regis Patrick Silva

Este guia explica como navegar pelo protótipo do RedeTrampo, publicado no Vercel ou executado localmente por `vercel dev`.

## Abrindo o protótipo

- **Localmente:** inicie `vercel dev` na pasta do projeto e abra o endereço mostrado no terminal. Não abra apenas o arquivo `index.html` por `file://` ou Live Server, pois a API `/api/redetrampo` não será executada.
- **Publicado (se houver link ativo):** acesse a URL informada pela equipe/documento de entrega.

## Telas e como usar cada uma

1. **Página inicial (`index.html`)**
   Apresenta a marca, uma busca rápida (categoria + cidade) e atalhos para as categorias. Clique em "Buscar" para ir direto aos resultados, ou explore as categorias em destaque.

2. **Localização (`localizacao.html`)**
   Escolha manualmente a cidade e, se quiser, o bairro/região. Ao confirmar, você é levado à tela de Resultados já filtrada.

3. **Categorias (`categorias.html`)**
   Lista as categorias e a contagem de perfis de exemplo e cadastrados. Clique em uma categoria para ver os resultados filtrados.

4. **Resultados (`resultados.html`)**
   Mostra perfis fictícios de exemplo e profissionais que autorizaram o cadastro. Use os filtros (categoria, bairro e termo de busca) para refinar a lista. Clique em "Ver perfil" para abrir o perfil completo.

5. **Perfil profissional (`perfil.html`)**
   Mostra os dados do profissional (descrição, serviços, região atendida e avaliações). Perfis de exemplo são identificados como fictícios. Para perfis cadastrados por voluntários, avaliações podem ser registradas na base compartilhada mediante consentimento. No final, há o botão para "Solicitar contato/orçamento".

6. **Solicitação de contato (`contato.html`)**
   Formulário para registrar uma solicitação de contato/orçamento. Todos os campos marcados com `*` são obrigatórios e exigem consentimento. A solicitação fica gravada na aba `Solicitacoes`; o sistema não envia mensagem automática ao profissional.

7. **Cadastro profissional (`cadastro-profissional.html`)**
   Formulário para um profissional se cadastrar (categoria, bairro, descrição e lista de serviços). Após aceitar o aviso de privacidade e enviar, o cadastro é salvo na aba `Profissionais` do Google Sheets e pode aparecer nas buscas de outros dispositivos. O telefone fica privado e não é exibido no perfil público.

## Observações importantes

- Os perfis pré-cadastrados são **fictícios**, identificados como exemplo/demonstração na interface. Os cadastros de voluntários são reais e devem ser realizados somente com consentimento.
- Não é necessário login, senha ou qualquer documento pessoal para usar o protótipo.
- O protótipo funciona em celular, tablet e computador (layout responsivo). A planilha deve permanecer privada e acessível somente à equipe. Não cadastre documentos, CPF, dados bancários ou outras informações sensíveis.
- Dados de cadastro, solicitação e avaliação são gravados na planilha compartilhada do projeto. A localização selecionada fica salva no navegador. O telefone do profissional não é exibido no perfil público.
