# Playwright TypeScript Template

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/RodrigoOBC/PlaywrightTemplateTypeScript)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

Um template robusto para iniciar projetos de testes automatizados de ponta a ponta (E2E) utilizando Playwright e TypeScript, seguindo o padrão Page Object Model (POM).

## 📖 Sobre o Projeto

Este repositório serve como um ponto de partida acelerado para a criação de suítes de testes automatizados. Ele já vem pré-configurado com uma estrutura de pastas organizada, componentes reutilizáveis e exemplos práticos para testes web.

A estrutura foi projetada para ser escalável e de fácil manutenção, separando a lógica das páginas, componentes e os próprios casos de teste.

### ✨ Tecnologias Utilizadas

*   [Playwright](https://playwright.dev/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Node.js](https://nodejs.org/)

---

## 🚀 Começando

Siga estas instruções para ter uma cópia do projeto rodando em sua máquina local para desenvolvimento e execução de testes.

### ✅ Pré-requisitos

Você precisa ter o Node.js e o npm instalados em sua máquina.

*   **npm**
    ```sh
    npm install npm@latest -g
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
3.  Instale as dependências do NPM:
    ```sh
    npm install
    ```
4.  Instale os navegadores do Playwright:
    ```sh
    npx playwright install
    ```

---

## 🛠️ Uso

### Executando os Testes

*   **Para rodar todos os testes em modo headless (padrão):**
    ```sh
    npx playwright test
    ```

*   **Para rodar os testes em modo "headed" (com navegador visível):**
    ```sh
    npx playwright test --headed
    ```

*   **Para rodar os testes em um navegador específico:**
    ```sh
    npx playwright test --project=chromium
    ```

*   **Para abrir o modo de UI do Playwright:**
    ```sh
    npx playwright test --ui
    ```

### Visualizando os Relatórios

Após a execução dos testes, um relatório HTML será gerado na pasta `playwright-report`. Para abri-lo, use o comando:

```sh
npx playwright show-report
```

---

## 🗺️ Roadmap

*   [ ] Adicionar exemplos de testes de API.
*   [ ] Integrar com CI/CD (GitHub Actions).
*   [ ] Implementar o uso de variáveis de ambiente com `.env`.
*   [ ] Criar mais componentes reutilizáveis.

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