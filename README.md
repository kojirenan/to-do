# Back-End To-Do

Projeto em Node - para criação de Usuários e Lista de Tarefas.

A aplicação realiza a criação de usuários com email e senha.
Após a autenticação do usuário é possível buscar, criar, atualizar e deletar as tarefas.

---

A aplicação se encontra disponível em - [To-Do Back-End](https://to-do-jar3.onrender.com).

Onde é possível testar a aplicação com Postman.

Verique na seção de Manipulação de Usuários e Tarefas

## Instalação

Certifique-se de ter o Node.js instalado em seu sistema. E execute o comando

```bash
npm install
```

## Configuração

Defina as variáveis de ambiente necessárias no arquivo `.env`, como PGHOST, PGDATABASE, PGUSER, ,PGPASSWORD ,ENDPOINT_ID para o banco de dados e SECRET para utilizar no Bcrypt
Certifique-se de configurar o banco de dados SQL PostGres

Após iniciar o servidor, execute o comando

```bash
npm start
```

Isso iniciará o servidor Node.js. Você pode então acessar a API usando um cliente HTTP ou teste utilizando ferramentas como Postman ou cURL.

### Manipulação de usuários

POST /create: Cria um novo usuário.
Exemplo de corpo da solicitação:

```json
{
    "email": "exemplo@example.com",
    "password": "senha123"
}
```

POST /login: Faz o login do usuário.
Exemplo de corpo da solicitação:

```json
{
    "email": "exemplo@example.com",
    "password": "senha123"
}
```

PUT /users/:id/config: Atualiza os detalhes de um usuário específico. Necessário sempre enviar a senha antiga antes de atualizar o email ou a nova senha
Exemplo de corpo da solicitação:

```json
{
    "email": "exemplo@example.com",
    "newPassword": "senha123",
    "password": "senha123"
}
```

DELETE /users/:id/config: Exclui um usuário específico.
Necessário sempre enviar a senha para exclusão de usuário
Exemplo de corpo da solicitação:

```json
{
    "password": "senha123"
}
```

### Manipulação de Tarefas

GET /users/:id/home: Busca todas as tarefas referente ao usuário.
Exemplo de Header da solicitação:

```json
{
    "x-access-token": "hash"
}
```

POST /users/:id/home: Cria uma nova tarefa.
Exemplo de corpo da solicitação:

```json
{
  "title": "Título",
  "description": "Descrição",
    "done": false,
    "date": 2024-02-27 16:22:15.058+00,
}
```

PUT /users/:id/home: Atualiza uma tarefa.
Sendo requerido o title e done, os outros elementos não são necessários enviar no corpo.
Exemplo de corpo da solicitação:

```json
{
    "id": 1,
  "title": "Título",
  "description": "Descrição",
    "done": false,
    "date": 2024-02-27 16:22:15.058+00,
}
```

DELETE /users/:id/home: Deleta uma tarefa.
Exemplo de corpo da solicitação:

```json
{
    "id": 1
}
```

## Stack utilizada

**Back-end:** Node, Express, Sequelize, Bcrypt.

Contribuições são bem-vindas! Sinta-se à vontade para abrir um PR ou reportar problemas.

Licença
Este projeto está licenciado sob a [Nome da Licença]. Consulte o arquivo LICENSE para obter mais detalhes.
