# Arquitetura do Sistema - AM Dashboard

Este documento descreve as principais decisões de arquitetura, padrões de segurança e resiliência implementados no AM Dashboard.

## 1. Segurança de Autenticação

O sistema utiliza um modelo de autenticação híbrido e altamente seguro:

- **Access Token (Memória):** O JWT de acesso é armazenado apenas em memória no cliente. Isso o protege contra ataques XSS (Cross-Site Scripting), já que scripts maliciosos não conseguem ler o token da memória de execução de forma trivial.
- **Refresh Token (HttpOnly Cookie):** O token de renovação é armazenado em um cookie `HttpOnly`, `Secure` e `SameSite=Strict`. Isso impede o acesso via JavaScript, mitigando riscos de roubo de sessão.
- **Refresh Automático:** O cliente tenta renovar o Access Token automaticamente em caso de expiração (401) ou no carregamento inicial da aplicação.

## 2. Proteção contra CSRF

Implementamos uma estratégia de defesa em profundidade contra Cross-Site Request Forgery:

- **Custom Header Validation:** O backend exige um cabeçalho customizado (`x-requested-with` ou `x-csrf-token`) para todas as rotas de mutação (POST, PUT, DELETE, PATCH). Como navegadores não permitem que requisições cross-origin adicionem cabeçalhos customizados sem uma preflight CORS bem-sucedida, isso bloqueia ataques CSRF automáticos.
- **CORS Estrito:** O backend valida a origem da requisição contra uma lista branca configurável (`CORS_ORIGINS`).

## 3. Resiliência da Interface

Para garantir que falhas parciais não quebrem a experiência total do usuário:

- **Chart Error Boundaries:** Cada gráfico é envolvido por uma barreira de erro React. Se um gráfico falhar na renderização devido a dados inesperados, apenas aquele componente mostra um estado de erro, permitindo que o restante do dashboard continue funcional.
- **Reset de Erro:** O usuário pode tentar renderizar o gráfico novamente através de um botão de reset na própria barreira de erro.

## 4. Fluxo de Dados

O frontend consome a API REST utilizando Axios com interceptores para:
1. Inserir o Access Token em todas as requisições.
2. Capturar erros 401 e disparar o fluxo de renovação de token.
3. Tratamento global de erros e logs em desenvolvimento.
