# api-adocao-pets

API REST para um sistema de adoção de animais de estimação.

O projeto permite cadastrar usuários, cadastrar pets, fazer login com JWT e registrar adoções.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL/MariaDB
- JWT
- bcrypt
- ESLint
- Prettier

## Como instalar

Instale as dependências:

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto, se quiser alterar as configurações padrão:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=pets_db
JWT_SECRET=chaveSecreta123
JWT_EXPIRES_IN=1h
```

Se o `.env` não existir, a API usa os valores padrão definidos no código.

## Banco de dados

O banco usado é `pets_db`.

Execute os scripts SQL nesta ordem:

```text
src/DB/create_tables.sql
src/DB/insert_tables.sql
```

Tabelas criadas:

- `users`: usuários do sistema
- `pets`: animais disponíveis ou adotados
- `adoptions`: relação entre usuário e pet adotado

Usuários iniciais para teste:

```text
Admin
email: admin@email.com
senha: admin123

Adopter
email: AAlmeida1337mitinho@email.com
senha: user123
```

## Como executar

Modo desenvolvimento:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

A API roda por padrão em:

```text
http://localhost:3000
```

## Scripts úteis

```bash
npm run lint
npm run lint:fix
npx prettier --check .
npx prettier --write .
```

## Rotas públicas

```text
GET  /pets/available
POST /users
POST /login
```

## Rotas protegidas

As rotas protegidas precisam do token JWT no cabeçalho:

```text
Authorization: Bearer SEU_TOKEN
```

Usuários:

```text
GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
```

Pets:

```text
GET    /pets
GET    /pets/:id
POST   /pets
PUT    /pets/:id
DELETE /pets/:id
```

Adoções:

```text
GET  /adoptions
POST /adoptions
```

## Regras principais

- Senhas são criptografadas com bcrypt.
- Login retorna um token JWT.
- O token JWT contém `userId` e `role`.
- Usuários `admin` podem gerenciar usuários e pets.
- Usuários `adopter` podem adotar pets.
- Apenas pets com status `available` podem ser adotados.
- Após a adoção, o pet muda para `adopted`.
- Senhas não são retornadas nas respostas JSON.

## Testes REST Client

Os testes manuais estão em:

```text
tests/.rest
```

Para usar, instale a extensão REST Client no VSCode, inicie a API e execute as requisições do arquivo.
