# Custo Fácil API

## Descrição

A **Custo Fácil API** é uma API desenvolvida em **TypeScript** utilizando **Node.js**. Este projeto visa facilitar a gestão de custos para setores de uma empresa.

## Tecnologias Utilizadas

- **TypeScript** — Linguagem de desenvolvimento.
- **Node.js** — Ambiente de execução.
- **Express** — Framework para criação de APIs.
- **MongoDB** — Banco de dados NoSQL.
- **Docker** — Contêinerização para facilitar o desenvolvimento e deployment.
- **Docker Compose** — Orquestração de serviços, incluindo a configuração do MongoDB.

## Pré-requisitos

- **Node.js** v14+ instalado.
- **npm** ou **yarn** instalado.
- **Docker** e **Docker Compose** instalados para configurar o banco de dados MongoDB.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/ByteCarlos/custo-facil-api.git
   cd custo-facil-api

2. Instale as dependências:
    ```bash
    yarn install

3. Configure as variáveis de ambiente criando um arquivo .env na raiz do projeto:
    ```bash
    cp .env.example .env

5. Configure o MongoDB utilizando Docker Compose. Certifique-se de que o Docker esteja instalado e execute o comando abaixo para iniciar o banco de dados MongoDB:
    ```bash
    docker-compose up -d

6. Criar diretório do código compilado
    ```bash
    mkdir dist

7. Compile o código TypeScript
    ```bash
    npm run build

8. Inicie o servidor
    ```bash
    npm start
