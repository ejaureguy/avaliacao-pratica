# Avaliação Prática — Estágio TRE-RR

Aplicação Angular para cadastro, visualização e edição de pessoas, com formulário multi-etapas e integração com ViaCEP para autocomplete dos campos de endereço.

***

## 🐳 Rodar com Docker (recomendado)

**Pré-requisitos:** [Docker](https://www.docker.com/get-started) instalado.

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd avalicao-pratica

# 2. Suba o container
docker compose up --build
```

Acesse em: **[http://localhost:4200](http://localhost:4200)**

Para parar:
```bash
docker compose down
```

***

## 💻 Rodar localmente (sem Docker)

**Pré-requisitos:** [Node.js 22+](https://nodejs.org/) instalado.

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd avaliacao-pratica

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm start
```

Acesse em: **[http://localhost:4200](http://localhost:4200)**

***

## ⚙️ Variáveis de Ambiente

As configurações da API ficam nos arquivos `src/environments/`:

| Arquivo | Uso |
|---|---|
| `environment.ts` | Desenvolvimento |

***

## 🗂️ Funcionalidades

- Cadastro de pessoas em formulário multi-etapas (5 passos)
- Busca automática de endereço pelo CEP (ViaCEP)
- Listagem paginada de cadastros
- Visualização de detalhes
- Edição de cadastros existentes
- Exclusão com confirmação
- Validação de formulário com mensagens de erro
- Feedback visual com toasts

***

## 🛠️ Tecnologias

- [Angular 21](https://angular.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ngx-mask](https://github.com/JsDaddy/ngx-mask)
- [ViaCEP](https://viacep.com.br/)
- [Docker](https://www.docker.com/) + [Nginx](https://nginx.org/)