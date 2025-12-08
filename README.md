# Playwright TypeScript Template

[![Status](https://img.shields.io/badge/status-ativo-brightgreen)](https://github.com/RodrigoOBC/PlaywrightTemplateTypeScript)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D8-orange.svg)](https://pnpm.io/)

Um template robusto para iniciar projetos de testes automatizados de ponta a ponta (E2E) utilizando Playwright e TypeScript, seguindo o padrão Page Object Model (POM).

Este projeto utiliza o [OrangeHRM Open Source Demo](https://opensource-demo.orangehrmlive.com/) como aplicação de referência para demonstrar as práticas implementadas.

## 📖 Sobre o Projeto

Este repositório serve como um ponto de partida acelerado para a criação de suítes de testes automatizados. Ele já vem pré-configurado com uma estrutura de pastas organizada, componentes reutilizáveis, linting configurado e pipelines de CI/CD.

A estrutura foi projetada para ser escalável e de fácil manutenção, separando a lógica das páginas, componentes e os próprios casos de teste.

### ✨ Tecnologias Utilizadas

*   [Playwright](https://playwright.dev/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Node.js](https://nodejs.org/)
*   [pnpm](https://pnpm.io/) - Gerenciador de pacotes rápido e eficiente.
*   [ESLint](https://eslint.org/) - Para garantir a qualidade e padronização do código.

### 🌟 Principais Funcionalidades

*   **Page Object Model (POM)**: Organização clara de páginas e componentes (e.g., `tests/page`, `tests/components`).
*   **Fixtures Customizadas**:
    *   `authenticatedPage`: Provê uma página já logada como Admin, agilizando testes que requerem autenticação.
    *   `orangeApi`: Contexto de API autenticado para realizar operações de backend (Hybrid Testing).
    *   `cleanupUsersById`, `createUserByTest`: Helpers para gestão de massa de dados via API.
*   **Componentes Reutilizáveis**: Abstração de elementos comuns de UI (Botões, Tabelas, Menus) em `tests/components`.
*   **CI/CD**: Workflows do GitHub Actions configurados para rodar testes em Pull Requests e Pushs na main.
*   **Qualidade de Código**: Configuração de ESLint inclusa.

---

## 🚀 Começando

Siga estas instruções para ter uma cópia do projeto rodando em sua máquina local para desenvolvimento e execução de testes.

### ✅ Pré-requisitos

Este projeto utiliza exclusivamente o **pnpm** para gerenciamento de dependências. Certifique-se de ter o Node.js e o pnpm instalados.

*   **Instalando o pnpm (via npm):**
    ```sh
    npm install -g pnpm
    ```

### 📦 Instalação

1.  Clone o repositório:
    ```sh
    git clone https://github.com/RodrigoOBC/PlaywrightTemplateTypeScript.git
    ```
2.  Navegue até o diretório do projeto:
    ```sh
    cd PlaywrightTemplateTypeScript
    ```
3.  Instale as dependências com pnpm:
    ```sh
    pnpm install
    ```
4.  Instale os navegadores do Playwright:
    ```sh
    pnpm exec playwright install
    ```

---

## 🛠️ Uso

### Executando os Testes

*   **Para rodar todos os testes em modo headless (padrão):**
    ```sh
    pnpm exec playwright test
    ```

*   **Para rodar os testes em modo "headed" (com navegador visível):**
    ```sh
    pnpm exec playwright test --headed
    ```

*   **Para rodar os testes em um navegador específico:**
    ```sh
    pnpm exec playwright test --project=chromium
    ```

*   **Para abrir o modo de UI do Playwright:**
    ```sh
    pnpm exec playwright test --ui
    ```

### Verificando a Qualidade do Código (Lint)

Para rodar o linter e verificar se há erros de estilo ou problemas no código:

```sh
pnpm exec eslint .
```

### Visualizando os Relatórios

Após a execução dos testes, um relatório HTML será gerado na pasta `playwright-report`. Para abri-lo, use o comando:

```sh
pnpm exec playwright show-report
```

---

## 🗺️ Roadmap

*   [x] Adicionar exemplos de testes de API (Implementado via Fixtures e suporte híbrido).
*   [x] Integrar com CI/CD (GitHub Actions).
*   [x] Criar componentes reutilizáveis (Implementado em `tests/components`).
*   [ ] Implementar o uso de variáveis de ambiente com `.env` (Parcialmente configurado, mas não ativo por padrão).

Veja as [issues abertas](https://github.com/RodrigoOBC/PlaywrightTemplateTypeScript/issues) para uma lista completa de funcionalidades propostas (e problemas conhecidos).

---

## 🤝 Contribuindo

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1.  Faça um "Fork" do projeto
2.  Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Faça o "Commit" de suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4.  Faça o "Push" para a Branch (`git push origin feature/AmazingFeature`)
5.  Abra um Pull Request

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE.txt` para mais informações.