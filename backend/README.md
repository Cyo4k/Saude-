# 📝 Documentação Completa do Projeto "Saúde+" (Full-Stack)

Este documento fornece um guia completo para configurar, instalar e executar a aplicação "Saúde+", que consiste em um frontend em React e um backend em Node.js com Express e MongoDB.

## 📋 Índice

1.  [Visão Geral do Projeto](#visao-geral-do-projeto)
2.  [Estrutura do Projeto](#estrutura-do-projeto)
3.  [Pré-requisitos](#pre-requisitos)
4.  [Configuração e Instalação do Backend](#configuracao-e-instalacao-do-backend)
    * [Instalação das Dependências do Backend](#instalacao-das-dependencias-do-backend)
    * [Configuração das Variáveis de Ambiente do Backend](#configuracao-das-variaveis-de-ambiente-do-backend)
    * [Iniciando o Servidor Backend](#iniciando-o-servidor-backend)
5.  [Configuração e Instalação do Frontend](#configuracao-e-instalacao-do-frontend)
    * [Instalação das Dependências do Frontend](#instalacao-das-dependencias-do-frontend)
    * [Configuração das Variáveis de Ambiente do Frontend](#configuracao-das-variaveis-de-ambiente-do-frontend)
    * [Iniciando o Cliente Frontend](#iniciando-o-cliente-frontend)
6.  [Visão Geral da API (Endpoints Principais)](#visao-geral-da-api-endpoints-principais)
7.  [Resumo das Principais Páginas do Frontend](#resumo-das-principais-paginas-do-frontend)
8.  [Explicação de Arquivos e Conceitos Chave](#explicacao-de-arquivos-e-conceitos-chave)
    * [Backend](#backend)
    * [Frontend](#frontend)
9.  [Adicionando Funcionalidade de "Copiar" Comandos](#adicionando-funcionalidade-de-copiar-comandos)

---

### Configuração das Variáveis de Ambiente do Backend

O backend utiliza variáveis de ambiente para configurações sensíveis e específicas do ambiente.

1.  No diretório `backend/`, crie um arquivo chamado `.env`.
2.  Adicione as seguintes variáveis ao arquivo `.env`, substituindo os valores de exemplo pelos seus:

    ```env
    PORT=5000
    MONGODB_URI=mongodb+srv://<seu_usuario_atlas>:<sua_senha_atlas>@<seu_cluster_atlas>.mongodb.net/<nome_do_seu_banco_de_dados>?retryWrites=true&w=majority
    JWT_SECRET=suaChaveSecreta
    FRONTEND_URL=http://localhost:3000
    ```
    * `PORT`: Porta em que o servidor backend será executado.
    * `MONGODB_URI`: Sua string de conexão do MongoDB Atlas. Substitua `<seu_usuario_atlas>`, `<sua_senha_atlas>`, `<seu_cluster_atlas>` e `<nome_do_seu_banco_de_dados>` pelas suas credenciais e informações do cluster do Atlas.
    * `JWT_SECRET`: Uma string secreta para assinar os JSON Web Tokens (JWT).
    * `FRONTEND_URL`: URL do frontend para configuração do CORS.

### Iniciando o Servidor Backend

Após instalar as dependências e configurar as variáveis de ambiente:

1.  Para iniciar o servidor em modo de desenvolvimento (com `nodemon` para recarregamento automático ao salvar alterações):
    ```bash
    npm run dev
    ```
2.  Para iniciar o servidor em modo de produção:
    ```bash
    npm start
    ```
    Você deverá ver uma mensagem no console indicando que o servidor está rodando na porta especificada (ex: `Servidor rodando na porta 5000`). O servidor também tentará se conectar ao MongoDB.

---

## 5. Configuração e Instalação do Frontend

Siga os passos abaixo para configurar e executar a aplicação frontend em React.

### Instalação das Dependências do Frontend

1.  Navegue até o diretório `frontend/` do projeto no seu terminal.
2.  Execute o comando para instalar as dependências listadas no `package.json` do frontend:

    Com npm:
    ```bash
    npm install
    ```
    Ou com Yarn:
    ```bash
    yarn install
    ```
    Isso instalará pacotes como `react`, `react-dom`, `axios`, `lucide-react`, `tailwindcss`, etc..

### Configuração das Variáveis de Ambiente do Frontend

O frontend pode usar variáveis de ambiente para configurar, por exemplo, a URL base da API.

1.  No diretório `frontend/`, crie um arquivo chamado `.env` (ou `.env.local`).
2.  Adicione as seguintes variáveis (se aplicável, conforme a configuração do seu `api.js` ou `apiRequest.js`):

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```
    * `REACT_APP_API_URL`: Usado pelo arquivo `src/api.js` para definir a `baseURL` do Axios. O arquivo `src/utils/apiRequest.js` utiliza uma URL base `http://localhost:5000` diretamente no código. Verifique qual abordagem está sendo utilizada predominantemente para chamadas à API e configure conforme necessário.

### Iniciando o Cliente Frontend

Após instalar as dependências:

1.  Para iniciar a aplicação React em modo de desenvolvimento:
    ```bash
    npm start
    ```
    Ou com Yarn:
    ```bash
    yarn start
    ```
    Isso geralmente abrirá a aplicação no seu navegador padrão, geralmente em `http://localhost:3000`.

---

## 6. Visão Geral da API (Endpoints Principais)

O backend expõe uma API RESTful para o frontend consumir. Todas as rotas são prefixadas com `/api`.

* **Autenticação (`/api/auth`)**:
    * `POST /register`: Registra um novo usuário.
    * `POST /login`: Autentica um usuário existente e retorna um token JWT.
    * `GET /profile`: (Rota movida para `/api/users/profile` mas listada em `authRoutes.js` no código antigo, verificar estrutura final) Retorna o perfil do usuário autenticado.
* **Usuários (`/api/users`)**:
    * `GET /profile`: Retorna o perfil do usuário autenticado (protegido).
    * `PUT /profile`: Atualiza o perfil do usuário autenticado, incluindo upload de foto (protegido).
* **Consultas (`/api/appointments`)**:
    * `GET /`: Retorna todas as consultas do usuário autenticado (protegido).
    * `POST /`: Cria uma nova consulta para o usuário autenticado (protegido).
    * `GET /:id`: Retorna uma consulta específica (protegido).
    * `PUT /:id`: Atualiza uma consulta específica (protegido).
    * `DELETE /:id`: Remove uma consulta específica (protegido).
* **Vacinas (`/api/vaccines`)**:
    * (Estrutura similar às consultas, com GET, POST, PUT, DELETE por ID, todas protegidas e associadas ao `userId`)
* **Medicamentos (`/api/medications`)**:
    * (Estrutura similar às consultas, com GET, POST, PUT, DELETE por ID, todas protegidas e associadas ao `userId`)
* **Unidades de Saúde (`/api/upas`)**:
    * `GET /`: Retorna uma lista de UPAs, com suporte a busca via query param `?search=` (público).
    * `GET /:id`: Retorna uma UPA específica por ID (público).
* **Uploads (`/uploads`)**:
    * `GET /:filename`: Serve arquivos estáticos (ex: fotos de perfil) da pasta `uploads/` no backend.

---

## 7. Resumo das Principais Páginas do Frontend

(Conforme documentado anteriormente, baseado nos arquivos do frontend)

* **`App.js`**: Componente raiz que gerencia o layout, navegação e estado de autenticação.
* **`HomePage.js`**: Dashboard inicial com boas-vindas e resumos de saúde.
* **`AppointmentsPage.js`**: CRUD para gerenciamento de consultas.
* **`VaccinesPage.js`**: CRUD para gerenciamento de vacinas.
* **`MedicationsPage.js`**: CRUD para gerenciamento de medicamentos.
* **`UPAsPage.js`**: Busca e visualização de unidades de saúde.
* **`ProfilePage.js`**: Visualização e edição do perfil do usuário.
* **`AuthPage.js`**: Página para login e registro de usuários.

---

## 8. Explicação de Arquivos e Conceitos Chave

### Backend

* **`server.js`**:
    * Ponto de entrada principal da aplicação backend.
    * Configura o Express, middlewares (CORS, `express.json`, `express.urlencoded`).
    * Estabelece a conexão com o MongoDB através do `connectDB`.
    * Monta as rotas para os diferentes recursos da API (ex: `/api/auth`, `/api/users`, etc.).
    * Serve arquivos estáticos da pasta `uploads/`.
* **`config/db.js`**:
    * Responsável por estabelecer e gerenciar a conexão com o banco de dados MongoDB usando Mongoose.
    * Utiliza a URI de conexão definida na variável de ambiente `MONGODB_URI`.
* **`middleware/authMiddleware.js` (`protect`)**:
    * Middleware Express para proteger rotas.
    * Verifica a presença de um token JWT no cabeçalho `Authorization` (tipo `Bearer`).
    * Valida o token usando `jsonwebtoken` e o `JWT_SECRET`.
    * Se o token for válido, anexa os dados do usuário (obtidos do banco ou do token decodificado) ao objeto `req` (`req.user`) para uso subsequente nos controllers.
    * Retorna erro 401 se o token for inválido, ausente ou expirado.
* **Estrutura MVC (Model-View-Controller) Adaptada:**
    * **Models** (ex: `UserModel.js`, `AppointmentModel.js`): Definem os schemas (estrutura dos dados) para cada coleção no MongoDB usando Mongoose. Incluem validações, tipos de dados e, em alguns casos, métodos e hooks (como o hash de senha no `UserModel`).
    * **Routes** (ex: `authRoutes.js`, `appointmentRoutes.js`): Definem os endpoints da API para cada recurso. Mapeiam os caminhos HTTP e os métodos (GET, POST, PUT, DELETE) para as funções correspondentes nos controllers. Podem aplicar middlewares (como o `protect`).
    * **Controllers** (ex: `authController.js`, `appointmentController.js`): Contêm a lógica de negócio para cada rota. Interagem com os Models para manipular dados no banco e enviam respostas HTTP (JSON) de volta ao cliente.

### Frontend

* **`AuthPage.js`**: (Conforme documentado anteriormente) Lida com os formulários de login e registro, fazendo chamadas diretas à API de autenticação do backend.
* **`apiRequest.js`**:
    * Helper customizado para realizar chamadas `fetch` à API do backend.
    * Encapsula a lógica de montagem de URLs (usando `http://localhost:5000` como base), configuração de cabeçalhos (incluindo `Authorization` com token e `Content-Type`) e tratamento de respostas/erros.
    * Suporta envio de `FormData` para uploads (como na foto de perfil).
* **`useAuth.js`**:
    * Hook React customizado para gerenciar o estado de autenticação do usuário no frontend.
    * Lê o token e nome do usuário do `localStorage` ao inicializar.
    * Busca dados adicionais do perfil do usuário (`/api/users/profile`) se um token existir.
    * Fornece o `userId`, `userName`, `token`, `profilePictureUrl` e o estado `isAuthReady` para os componentes da aplicação.
* **`api.js` (frontend)**:
    * Configura uma instância do Axios, definindo a `baseURL` a partir de `process.env.REACT_APP_API_URL` (ou `http://localhost:5000/api` como fallback).
    * Inclui um interceptor Axios para adicionar o token de autenticação (lido do `localStorage` com a chave `'token'`) a todas as requisições feitas por esta instância.
    * **Observação de Consistência**: O `useAuth.js` e `AuthPage.js` (frontend) usam `'userToken'` para o token no `localStorage`. O `api.js` (frontend) busca por `'token'`. É importante alinhar essas chaves para que o interceptor do Axios funcione corretamente com o token salvo. O `apiRequest.js` recebe o token como parâmetro, o que é uma abordagem mais explícita.
