# 🏗️ Arquitetura do Sistema - AM Dashboard

Este documento fornece uma visão técnica da arquitetura do AM Dashboard, destacando as decisões de design que garantem segurança, resiliência e uma experiência de desenvolvimento moderna.

## 🔄 Estrutura Monorepo

Utilizamos **Turborepo** + **pnpm workspaces** para gerenciar a base de código fullstack. Isso garante:
- **Configurações Compartilhadas:** ESLint, TypeScript e Tailwind centralizados.
- **Lógica Compartilhada:** Schemas Zod compartilhados entre API e Frontend.
- **Builds Atômicos:** Pipelines de CI/CD rápidos com cache de build.

## 🔐 Estratégia de Autenticação e Segurança

A segurança é o pilar central desta implementação. Adotamos uma estratégia de defesa em profundidade:

### 1. Armazenamento de Tokens (Memory-Only)
Para mitigar ataques **XSS (Cross-Site Scripting)**, o sistema utiliza um modelo híbrido:
- **Access Token:** Armazenado apenas em memória volatil do JavaScript. Scripts maliciosos não conseguem ler o token do disco ou do armazenamento persistente do navegador.
- **Refresh Token:** Armazenado em um **HttpOnly Cookie** com flags `Secure` e `SameSite=Strict`. Isso impede o acesso via JavaScript e protege contra roubo de sessão.

### 2. Proteção contra CSRF
Implementamos uma validação rigorosa para todas as requisições de mutação (POST, PUT, DELETE, PATCH):
- **Custom Header Validation:** O backend exige cabeçalhos como `x-requested-with` ou `x-csrf-token`. Navegadores impedem que requisições cross-origin adicionem cabeçalhos customizados sem uma preflight CORS bem-sucedida.
- **CORS Estrito:** Validação de origem contra uma whitelist dinâmica configurada via variáveis de ambiente.

## 🛡️ Resiliência da Interface

O Dashboard foi projetado para ser tolerante a falhas parciais:
- **Chart Error Boundaries:** Cada gráfico é isolado por uma barreira de erro React. Se um componente falhar (devido a dados malformados, por exemplo), apenas aquele gráfico exibe um estado de erro, mantendo o restante da aplicação funcional.
- **Auto-Recuperação:** Os usuários podem tentar renderizar novamente componentes falhos sem precisar atualizar a página inteira.

## 🎨 Filosofia de UI/UX

O Frontend (`apps/web`) foca em performance percebida e fluidez:
- **Skeleton Screens:** Skeletons integrados ao layout evitam saltos visuais (Cumulative Layout Shift) durante o carregamento de dados.
- **Interceptores Axios:** Fluxo de refresh de token transparente. Quando um token expira (401), o interceptor captura, renova o token em background e repete a requisição original sem que o usuário perceba.

## 🛠️ Decisões Técnicas

### Validação Unificada (Zod)
- Schemas definidos em `@repo/schemas`.
- **Backend:** Uso de pipes de validação para garantir a integridade dos DTOs de entrada.
- **Frontend:** Uso dos mesmos schemas para validação de formulários com React Hook Form.
- **Benefício:** Garantia de que as regras de negócio são idênticas em ambas as pontas.

### Performance
- **Throttling:** Implementado via `@nestjs/throttler` no backend para prevenir abusos e ataques de força bruta.
- **Build Optimization:** Divisão de código (code-splitting) automática para garantir que o bundle inicial seja leve.
