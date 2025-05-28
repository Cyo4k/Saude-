# 📝 Documentação do Projeto "Saúde+"

Este documento fornece uma visão geral do projeto frontend "Saúde+", incluindo instruções de instalação, um resumo das funcionalidades das páginas e detalhes sobre interações com a API.

---

## ⚙️ Instalação das Dependências

Para executar este projeto, você precisará ter o Node.js e o npm (ou Yarn) instalados.

1.  **Clone o repositório**
2.  **Navegue até o diretório raiz do projeto** onde o arquivo `package.json` está localizado.
3.  **Instale as dependências** usando o npm ou Yarn:


    Com npm:
    ```bash
    npm install
    ```
    Ou com Yarn:
    ```bash
    yarn install
    ```
    Isso instalará todas as dependências listadas no arquivo `package.json`, como React, Axios, Tailwind CSS, e outras bibliotecas de teste e utilitários.

4.  Após a instalação, você pode iniciar o servidor de desenvolvimento usando:
    ```bash
    npm start
    ```
    Ou com Yarn:
    ```bash
    yarn start
    ```
    Este comando está definido na seção `scripts` do `package.json`.

---

## 🌐 Rotas da API Utilizadas

O frontend interage com uma API backend para buscar e manipular dados. A URL base da API é configurada como `http://localhost:5000` no arquivo `apiRequest.js` e `http://localhost:5000/api` no arquivo `api.js`.

A seguir, uma lista das principais rotas da API utilizadas pela aplicação:

* **Autenticação (`AuthPage.js`, `useAuth.js`)**:
    * `POST /api/auth/login`: Para login de usuários.
    * `POST /api/auth/register`: Para registrar novos usuários.
    * `GET /api/users/profile`: Para buscar dados do perfil do usuário logado.

* **Consultas (`AppointmentsPage.js`, `HomePage.js`, `appointmentService.js`)**:
    * `GET /api/appointments`: Para buscar todas as consultas do usuário.
    * `POST /api/appointments`: Para criar uma nova consulta.
    * `GET /api/appointments/:id`: Para buscar uma consulta específica por ID.
    * `PUT /api/appointments/:id`: Para atualizar uma consulta existente.
    * `DELETE /api/appointments/:id`: Para excluir uma consulta.

* **Vacinas (`VaccinesPage.js`, `HomePage.js`)**:
    * `GET /api/vaccines`: Para buscar todas as vacinas do usuário.
    * `POST /api/vaccines`: Para adicionar uma nova vacina.
    * `PUT /api/vaccines/:id`: Para atualizar uma vacina existente.
    * `DELETE /api/vaccines/:id`: Para excluir uma vacina.

* **Medicamentos (`MedicationsPage.js`)**:
    * `GET /api/medications`: Para buscar todos os medicamentos do usuário.
    * `POST /api/medications`: Para adicionar um novo medicamento.
    * `PUT /api/medications/:id`: Para atualizar um medicamento existente.
    * `DELETE /api/medications/:id`: Para excluir um medicamento.

* **Unidades de Saúde (`UPAsPage.js`)**:
    * `GET /api/upas?search={termo_busca}`: Para buscar unidades de saúde com base em um termo.

* **Perfil do Usuário (`ProfilePage.js`)**:
    * `GET /api/users/profile`: Para buscar os dados do perfil do usuário.
    * `PUT /api/users/profile`: Para atualizar os dados do perfil do usuário, incluindo a foto (como FormData).

---

## 📄 Resumo das Principais Páginas

* **`App.js`**:
    * Componente raiz que gerencia o layout principal, incluindo a barra lateral de navegação e a renderização das diferentes páginas.
    * Controla o estado de autenticação e a página atual exibida.
    * Utiliza o hook `useAuth` para obter informações do usuário e o token.

* **`HomePage.js`**:
    * Página inicial que exibe uma mensagem de boas-vindas ao usuário.
    * Apresenta resumos de próximas vacinas e consultas, buscando dados das APIs `/api/vaccines` e `/api/appointments`.

* **`AppointmentsPage.js`**:
    * Permite ao usuário gerenciar suas consultas.
    * Oferece funcionalidades de visualização, adição, edição e exclusão de consultas, interagindo com o endpoint `/api/appointments`.

* **`VaccinesPage.js`**:
    * Permite ao usuário gerenciar seu histórico de vacinas.
    * Oferece funcionalidades de visualização, adição, edição e exclusão de vacinas, interagindo com o endpoint `/api/vaccines`.

* **`MedicationsPage.js`**:
    * Permite ao usuário gerenciar seus medicamentos.
    * Oferece funcionalidades de visualização, adição, edição e exclusão de medicamentos, interagindo com o endpoint `/api/medications`.

* **`UPAsPage.js`**:
    * Permite ao usuário buscar Unidades de Pronto Atendimento (UPAs) ou outras unidades de saúde.
    * Possui um campo de busca que filtra as unidades com base no nome, endereço ou serviços, interagindo com `/api/upas`.
    * Permite visualizar o endereço da unidade no mapa.

* **`ProfilePage.js`**:
    * Permite ao usuário visualizar e atualizar suas informações de perfil, como nome, endereço, telefone e foto de perfil.
    * Interage com o endpoint `/api/users/profile` para buscar e salvar os dados.

---

## 🧩 Explicação de Arquivos Chave

* **`AuthPage.js`**:
    * **Responsabilidade**: Gerencia a autenticação do usuário, permitindo que ele faça login ou se registre na aplicação.
    * **Funcionalidade**: Apresenta um formulário que alterna entre os modos de "Login" e "Cadastro".
    * **Interação com API**:
        * Envia requisições `POST` para `http://localhost:5000/api/auth/login` para login e `http://localhost:5000/api/auth/register` para registro, utilizando a função `fetch` nativa.
        * Em caso de sucesso, armazena o `userToken` e `userName` recebidos no `localStorage` e redireciona o usuário para a página inicial.
    * **Observação**: Este componente lida com a autenticação inicial. A manutenção do estado de autenticação e o acesso aos dados do usuário logado nas demais partes da aplicação são gerenciados principalmente pelo hook `useAuth.js`.

* **`api.js`**:
    * **Responsabilidade**: Configura uma instância global do Axios para realizar chamadas HTTP à API.
    * **Funcionalidade**:
        * Define a `baseURL` para as requisições como `process.env.REACT_APP_API_URL` ou, por padrão, `http://localhost:5000/api`.
        * Configura o `Content-Type` padrão para `application/json`.
        * Inclui um **interceptor de requisição** do Axios. Este interceptor adiciona automaticamente o token de autenticação (`Bearer token`) ao cabeçalho `Authorization` de todas as requisições feitas por esta instância do Axios. O token é recuperado do `localStorage` com a chave `'token'`.
    * **Observação**: Existe uma leve inconsistência: `AuthPage.js` salva o token como `'userToken'` no `localStorage`, enquanto este interceptor em `api.js` tenta buscar por `'token'`. O `useAuth.js` busca `'userToken'`. O `appointmentService.js` utiliza esta instância do Axios, portanto, para que o token seja enviado corretamente por ele, o token deveria ser salvo como `'token'` ou o interceptor deveria buscar por `'userToken'`. As demais páginas utilizam `apiRequest.js` que recebe o token explicitamente.

* **`apiRequest.js`**:
    * **Responsabilidade**: É uma função helper (utilitária) para realizar chamadas `fetch` à API de forma padronizada.
    * **Funcionalidade**:
        * Recebe a URL do endpoint, o método HTTP (padrão `GET`), o corpo da requisição (`body`), o token de autenticação e um booleano `isFormData`.
        * Constrói a URL absoluta prefixando `http://localhost:5000` caso a URL fornecida não seja absoluta.
        * Configura os cabeçalhos:
            * Define `Content-Type` como `application/json` se não for um `FormData` (`!isFormData`).
            * Adiciona o cabeçalho `Authorization: Bearer {token}` se um token for fornecido.
        * Se `body` for fornecido para métodos `POST` ou `PUT`, ele é convertido para JSON stringificado, a menos que `isFormData` seja `true` (nesse caso, o `body` é enviado como está, e.g., para upload de arquivos).
        * Realiza a chamada `fetch` e, em caso de erro na resposta (status não-ok), tenta parsear o erro do JSON da resposta ou usa o `statusText`. O erro é então relançado para ser tratado pelo componente que chamou a função.
        * Retorna os dados da resposta em formato JSON em caso de sucesso.
    * **Uso**: Este helper é utilizado pela maioria das páginas (`HomePage`, `AppointmentsPage`, `VaccinesPage`, `MedicationsPage`, `UPAsPage`, `ProfilePage`) e pelo hook `useAuth` para interagir com a API.

* **`appointmentService.js`**:
    * **Responsabilidade**: Encapsula a lógica de comunicação com a API especificamente para o recurso de "consultas" (`appointments`).
    * **Funcionalidade**: Exporta um objeto `appointmentService` com métodos para realizar operações CRUD (Create, Read, Update, Delete) em consultas:
        * `getAllAppointments()`: Busca todas as consultas (`GET /appointments`).
        * `createAppointment(appointmentData)`: Cria uma nova consulta (`POST /appointments`).
        * `getAppointmentById(id)`: Busca uma consulta por ID (`GET /appointments/:id`).
        * `updateAppointment(id, appointmentData)`: Atualiza uma consulta (`PUT /appointments/:id`).
        * `deleteAppointment(id)`: Deleta uma consulta (`DELETE /appointments/:id`).
    * **Interação**: Utiliza a instância do Axios configurada em `../config/api` (que é o arquivo `api.js`) para fazer as requisições. Isso significa que as chamadas feitas através deste serviço já terão o token de autenticação adicionado automaticamente pelo interceptor do Axios (considerando a observação sobre o nome da chave do token no `localStorage`).
