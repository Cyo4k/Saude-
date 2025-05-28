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



# Documento de Arquitetura da Aplicação "Saúde+"

## INTRODUÇÃO

A aplicação "Saúde+" é um sistema web full-stack desenvolvido para auxiliar os usuários no gerenciamento centralizado de suas informações pessoais de saúde. O sistema permite o acompanhamento de consultas médicas, histórico de vacinação, controle de medicamentos em uso, gerenciamento de perfil de usuário e a busca por unidades de saúde. O objetivo principal é fornecer uma plataforma intuitiva e organizada para que os usuários possam ter um controle mais eficiente e proativo sobre seus dados e compromissos de saúde, facilitando o acesso e a gestão dessas informações. O frontend é construído com React e o backend com Node.js e Express.

## PÚBLICO-ALVO DO PROJETO

O projeto "Saúde+" é destinado principalmente a:
* **Usuários Individuais/Pacientes:** Pessoas que desejam uma ferramenta digital para organizar e acompanhar seu histórico de saúde pessoal, incluindo consultas, vacinas, medicamentos, e informações de perfil.
* Qualquer indivíduo que precise buscar informações sobre Unidades de Pronto Atendimento (UPAs) ou outras unidades de saúde.

## RESULTADO ESPERADO E IMPACTO SOCIAL

O resultado esperado do projeto "Saúde+" é uma plataforma funcional e de fácil utilização que permita aos usuários:
* Manter um registro digital organizado de suas consultas médicas, com detalhes como data, hora, médico e especialidade.
* Controlar o histórico de vacinação, incluindo datas de aplicação e próximas doses.
* Gerenciar uma lista de medicamentos pessoais, com informações sobre dosagem e frequência.
* Atualizar e manter suas informações de perfil pessoal, incluindo foto.
* Localizar unidades de saúde próximas ou por critério de busca.

O impacto social esperado é o controle dos usuários na gestão de sua própria saúde, promovendo maior organização, adesão a tratamentos (através de melhor acompanhamento) e facilitando o acesso a informações relevantes de saúde.

## VISÃO GERAL DA ARQUITETURA

A aplicação "Saúde+" é desenvolvida com uma arquitetura cliente-servidor:
* **Frontend (Cliente):** Uma Single Page Application (SPA) desenvolvida utilizando a biblioteca React. É responsável por toda a renderização da interface do usuário e pela interação com o usuário. A comunicação com o backend é feita através de requisições HTTP para a API RESTful.
* **Backend (Servidor):** Uma API RESTful construída com Node.js e o framework Express.js. É responsável pela lógica de negócios, processamento de dados, autenticação de usuários e interação com o banco de dados MongoDB.
* **Banco de Dados:** Utiliza o MongoDB como sistema de gerenciamento de banco de dados NoSQL, com o Mongoose ODM para modelagem de dados e interação.
* **Comunicação:** A comunicação entre o frontend e o backend é realizada via HTTP, com o backend expondo endpoints RESTful que o frontend consome para enviar e receber dados no formato JSON.

<img src="https://www.mermaidchart.com/raw/f8822638-4a73-4e41-9c4e-b2acbfa14ad8?theme=light&version=v0.1&format=svg" alt="Descrição do Diagrama" width="350"/>

## REQUISITOS DO SISTEMA

### Requisitos Funcionais
O sistema "Saúde+" implementa as seguintes funcionalidades:

* **Autenticação de Usuários:**
    * Permite o registro de novos usuários com nome, email e senha.
    * Permite o login de usuários existentes utilizando email e senha.
    * Gera e utiliza tokens JWT para autenticação nas requisições subsequentes.
* **Gerenciamento de Perfil do Usuário:**
    * Permite ao usuário autenticado visualizar seu perfil.
    * Permite ao usuário autenticado atualizar suas informações de perfil, incluindo nome, endereço, telefone e foto de perfil (com upload de imagem).
* **Gerenciamento de Consultas:**
    * Permite ao usuário autenticado criar, visualizar, atualizar e excluir (CRUD) seus agendamentos de consultas.
* **Gerenciamento de Vacinas:**
    * Permite ao usuário autenticado criar, visualizar, atualizar e excluir (CRUD) seus registros de vacinas.
* **Gerenciamento de Medicamentos:**
    * Permite ao usuário autenticado criar, visualizar, atualizar e excluir (CRUD) seus registros de medicamentos.
* **Busca de Unidades de Saúde (UPAs):**
    * Permite a busca e visualização de informações sobre UPAs, como nome, endereço e telefone. Esta funcionalidade é pública.
* **Interface do Usuário:**
    * Apresenta uma interface com navegação principal através de uma barra lateral, permitindo acesso aos diferentes módulos da aplicação.
    * Utiliza componentes visuais e ícones para uma experiência de usuário mais intuitiva.

### Requisitos Não Funcionais

* **Segurança:** Utilização de JWT para autenticação de API e hashing de senhas com bcrypt. Configuração de CORS no backend para controlar o acesso do frontend.
* **Usabilidade:** Interface construída com React e TailwindCSS visando uma experiência de usuário moderna e responsiva.
* **Desempenho:** Espera-se que as respostas da API e a renderização do frontend sejam eficientes para uma boa experiência do usuário.
* **Manutenibilidade:** Código backend organizado em rotas, controllers e models. Código frontend componentizado utilizando React.
* **Escalabilidade:** A arquitetura Node.js e MongoDB oferece caminhos para escalabilidade horizontal e vertical, dependendo da infraestrutura de implantação.

## ARQUITETURA



**Descrição da Arquitetura do Backend:**
* O backend é uma aplicação Node.js/Express.
* A organização do código é feita separando as preocupações em:
    * **Rotas (`routes/`):** Define os endpoints da API para cada recurso principal (ex: `authRoutes.js`, `userRoutes.js`, `appointmentRoutes.js`, `vaccineRoutes.js`, `medicationRoutes.js`, `upaRoutes.js`). Elas direcionam as requisições para os controllers apropriados.
    * **Controladores (`controllers/`):** Contêm a lógica de negócio para cada rota (ex: `authController.js`, `UserController.js`, `appointmentController.js`, `vaccineController.js`, `medicationController.js`, `upaController.js`). Eles interagem com os modelos para acessar e manipular dados.
    * **Modelos (`models/`):** Definem os schemas do Mongoose para as coleções do MongoDB (ex: `UserModel.js`, `AppointmentModel.js`, `MedicationModel.js`, `VaccineModel.js`, `UpaModel.js`).
    * **Middleware (`middleware/`):** Funções que executam tarefas durante o ciclo de requisição-resposta, como a autenticação (`authMiddleware.js`).
    * **Configuração (`config/`):** Arquivos de configuração, como a conexão com o banco de dados (`db.js`).

   ![Diagrama de arquiterura](https://www.mermaidchart.com/raw/a4708a3f-9d12-441f-98aa-f65bf69b9aba?theme=light&version=v0.1&format=svg)




## TECNOLOGIAS UTILIZADAS

As principais tecnologias utilizadas no desenvolvimento do projeto "Saúde+" são:

* **Frontend:**
    * React.js
    * JavaScript (ES6+)
    * HTML5 & CSS3
    * TailwindCSS (para estilização)
    * Axios (para requisições HTTP à API)
    * Lucide-React (para ícones SVG)
    * React Scripts (para gerenciamento de build e desenvolvimento)
* **Backend:**
    * Node.js
    * Express.js (framework web para Node.js)
    * MongoDB (banco de dados NoSQL)
    * Mongoose (ODM para MongoDB)
    * JSON Web Tokens (JWT) (para autenticação)
    * Bcrypt.js (para hashing de senhas)
    * Multer (para upload de arquivos, ex: foto de perfil)
    * CORS (Cross-Origin Resource Sharing)
    * Dotenv (para gerenciamento de variáveis de ambiente)
* **Ferramentas de Desenvolvimento (Comum a ambos ou inferido):**
    * npm (Node Package Manager)
    * Git (para controle de versão)
    * Nodemon (para desenvolvimento backend com auto-reload)

## ARQUITETURA DE DADOS

A arquitetura de dados do projeto "Saúde+" é centrada no MongoDB, um banco de dados NoSQL orientado a documentos. O Mongoose é utilizado no backend como uma biblioteca ODM (Object Data Modeling) para definir a estrutura dos dados, validações e interagir com o banco de dados de forma mais estruturada.

Os principais modelos (collections) definidos são:

* **`User` (`UserModel.js`):**
    * `name`: String, obrigatório.
    * `email`: String, obrigatório, único, formato de email.
    * `password`: String, obrigatório, mínimo 6 caracteres (armazenado como hash).
    * `address`: String (opcional).
    * `phoneNumber`: String (opcional).
    * `profilePictureUrl`: String (URL da imagem de perfil, opcional).
    * `createdAt`: Data, padrão agora.
* **`Appointment` (`AppointmentModel.js`):**
    * `userId`: ObjectId, referência ao `User`, obrigatório.
    * `date`: Data, obrigatório.
    * `time`: String, obrigatório.
    * `doctor`: String, obrigatório.
    * `specialty`: String, obrigatório.
    * `status`: String, enum ['agendado', 'confirmado', 'cancelado', 'realizado'], padrão 'agendado'.
    * `notes`: String (opcional).
    * `location`: String (opcional).
    * `timestamps`: true (adiciona `createdAt` e `updatedAt`).
* **`Vaccine` (`VaccineModel.js`):**
    * `userId`: ObjectId, referência ao `User`, obrigatório.
    * `name`: String, obrigatório.
    * `date`: Data, obrigatório (data de aplicação).
    * `nextDoseDate`: Data (opcional).
    * `notes`: String (opcional).
    * `timestamps`: true.
* **`Medication` (`MedicationModel.js`):**
    * `userId`: ObjectId, referência ao `User`, obrigatório.
    * `name`: String, obrigatório.
    * `dosage`: String, obrigatório.
    * `frequency`: String, obrigatório.
    * `startDate`: Data, obrigatório.
    * `endDate`: Data (opcional).
    * `doctor`: String, obrigatório.
    * `notes`: String (opcional).
    * `active`: Boolean, padrão `true`.
    * `timestamps`: true.
* **`Upa` (`UpaModel.js`):**
    * `name`: String, obrigatório.
    * `address`: String, obrigatório.
    * `phone`: String, obrigatório.


![Descrição do Diagrama](https://www.mermaidchart.com/raw/a42f9c55-00dd-4b22-b776-f51688c7f717?theme=light&version=v0.1&format=svg)
    

Os dados são armazenados como documentos BSON (JSON binário) no MongoDB. Os relacionamentos, como entre `Appointment` e `User`, são mantidos através de referências de `ObjectId` (`userId` em `Appointment` referencia `_id` em `User`).

## SEGURANÇA

As seguintes medidas de segurança foram implementadas no projeto "Saúde+":

* **Autenticação Baseada em Token JWT:**
    * Após o login bem-sucedido, o backend gera um JSON Web Token (JWT) assinado com um segredo (`JWT_SECRET`). Este token é enviado ao frontend.
    * O frontend envia este JWT no cabeçalho `Authorization` (como `Bearer <token>`) em requisições subsequentes para rotas protegidas da API.
* **Middleware de Proteção de Rotas (`protect`):**
    * No backend, um middleware (`authMiddleware.js`) intercepta requisições a rotas protegidas.
    * Ele verifica a validade do JWT. Se o token for válido, extrai as informações do usuário (como o ID) e anexa ao objeto `req` (`req.user`), permitindo que o controller subsequente saiba qual usuário está fazendo a requisição e verifique permissões se necessário.
    * Se o token for inválido, ausente ou expirado, o acesso é negado com um status HTTP 401.
* **Hashing de Senhas:**
    * As senhas dos usuários nunca são armazenadas em texto plano. Antes de salvar um novo usuário ou atualizar uma senha, ela é hasheada usando o algoritmo bcryptjs.
    * Durante o login, a senha fornecida é comparada com o hash armazenado usando `bcrypt.compare()`.
* **Validação de Dados:**
    * Os modelos Mongoose no backend incluem validações de schema para os dados recebidos (ex: campos obrigatórios, tipos de dados, formato de email).
    * Os controllers também realizam verificações básicas nos dados de entrada.
* **CORS (Cross-Origin Resource Sharing):**
    * O backend utiliza o middleware `cors` para restringir quais origens (domínios do frontend) podem fazer requisições à API, prevenindo certos tipos de ataques cross-site. É configurado para permitir requisições da `FRONTEND_URL` definida nas variáveis de ambiente.
* **Proteção contra Upload de Arquivos Maliciosos:**
    * O `multer` no `UserController.js` está configurado para filtrar os tipos de arquivos permitidos para upload de fotos de perfil (apenas imagens como jpeg, jpg, png, gif) e impõe um limite de tamanho de arquivo.


![Diagrama de segurança](https://www.mermaidchart.com/raw/a0b456ba-0517-4ebe-bffc-27a235412731?theme=light&version=v0.1&format=svg)

## AMBIENTE DE IMPLANTAÇÃO E OPERAÇÃO

A aplicação "Saúde+" é composta por um frontend React e um backend Node.js, que podem ser implantados separadamente ou em conjunto, dependendo da estratégia de hospedagem.

* **Backend (Node.js/Express API):**
    * Pode ser implantado em qualquer ambiente que suporte Node.js.
    * Opções comuns incluem:
        * **Plataformas como Serviço (PaaS):** Heroku, Google App Engine, AWS Elastic Beanstalk, Azure App Service.
        * **Servidores Virtuais Privados (VPS) / Contêineres:** AWS EC2, Google Compute Engine, DigitalOcean Droplets, Docker.
    * Requer uma instância do MongoDB acessível (local, auto-hospedada ou um serviço como MongoDB Atlas).
    * Um gerenciador de processos como o PM2 é recomendado para produção para manter a aplicação rodando e gerenciar logs.
* **Frontend (React App):**
    * Após o processo de build (`npm run build`), o frontend é compilado em um conjunto de arquivos estáticos (HTML, CSS, JavaScript).
    * Esses arquivos estáticos podem ser hospedados em:
        * **Serviços de Hospedagem de Sites Estáticos:** Netlify, Vercel, GitHub Pages, AWS S3 (com CloudFront para CDN).
        * **Servidores Web Tradicionais:** Nginx, Apache, configurados para servir o `index.html` principal para todas as rotas do lado do cliente.
        * Junto com o backend em uma configuração full-stack no mesmo servidor (menos comum para SPAs modernas, mas possível).
* **Banco de Dados (MongoDB):**
    * Pode ser uma instância local para desenvolvimento/teste.
    * Para produção, recomenda-se um serviço gerenciado de banco de dados como o MongoDB Atlas para maior confiabilidade, escalabilidade e backups.

**Diagrama de Infraestrutura:**


![Diagrama de Infraestrutura da Aplicação](https://www.mermaidchart.com/raw/d782d3de-3c84-456e-8cc5-4f75ac7b5ec3?theme=light&version=v0.1&format=svg)
