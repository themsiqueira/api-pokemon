# Api Pokemon

Api REST para cadastro e gerênciamento de pokemons.

# Como configurar o projeto:

### 1. Instale o NodeJS

- _NodeJS:_ https://nodejs.org/en/

### 2. Instale o yarn ou npm

- _yarn:_ https://yarnpkg.com/lang/en/

- _npm:_ https://www.npmjs.com/get-npm

### 3. Instale o docker toolbox para rodar o banco de dados:

- https://docs.docker.com/toolbox/toolbox_install_windows/

#### 3.1 Instale a imagem do postgres e crie os bancos utilizando a documentação ou os comandos abaixo no cli do docker:

- https://hub.docker.com/_/postgres

`docker run --name liveonpokemon -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres`

- https://hub.docker.com/_/mongo

`docker run --name mongoliveonpokemon -p 27017:27017 -d -t mongo`

obs: caso queira rodar o projeto com outros bancos sera necessario configurar a connection no arquivo .env,
e no index da pasta database.

# Rodando o projeto:

Instale as dependências do projeto:

`yarn install`

ou

`npm install`

Antes de iniciar o projeto rode as migrations para modelar o banco:

`yarn sequelize db:migrate`

## Comandos disponíveis

Abaixo temos alguns comandos úteis para debug, execução e executar testes.

- Executar o projeto localmente:

  `yarn dev` ou `npm run dev`

- Executar o projeto no vscode em modo debug:

  `yarn debug` ou `npm run debug`

- Executar os testes com o jest:

  `yarn test` ou `npm run test`

  > Obs: Para rodar os testes você deve configurar o arquivo .env e criar um banco de teste, esse procedimento server para não causar alterações no banco durante os teste.

# Rotas

- Url base:
  `http://localhost:3333/api`

> Obs: a porta pode ser configurada no arquivo server.js, ao mudar a porta também é necessário mudar o script de debug

#### Criação de usuário:

Tipo: POST

Endpoint:
`/newUser`

Body:

```
  {
    "name": "Aqui vai seu nome",
    "email": "Aqui vai seu email",
    "password": "Aqui vai sua senha"
  }
```

Retorno:

```
  {
    "id": "id do usuario",
    "name": "nome do usuario"
    "email": "email do usuario"
  }
```

#### Login de usuário (Auth):

Tipo: POST
Endpoint:
`/login`

Body:

```
  {
    "email": "Aqui vai seu email",
    "password": "Aqui vai sua senha"
  }
```

Retorno:

```
  {
   "user": {
     "id": "id do usuario",
     "name": "nome do usuario"
     "email": "email do usuario"
   },
   "token": "token jwt gerado"
  }

```

#### Atualização de usuário:

Tipo: PUT
Segurança: Token Jwt que é retornado na autenticação
Endpoint:
`/updateUser`

Body:

```
  {
    "name": "Aqui vai seu nome orbigadotiro, caso queira alterar mande um novo",
    "email": "Aqui vai seu email obrigatorio, caso queira alterar mande um novo caso",
    "oldPassword": "Aqui vai sua senha antiga caso pre queira mudar",
    "password": "Aqui vai sua senha nova",
    "confirmPassword": "Aqui vai sua senha nova de novo para confirmação"
  }
```

Retorno:

```
{
  "id": "id do usuario",
  "name": "Nome do usuário"
  "email": "email do usuário"
}

```

#### Criação de pokemon:

Tipo: POST

Segurança: Token Jwt que é retornado na autenticação

Endpoint:
`/newPokemon`

Body:

```
  {
    "type": "Rock",
    "specie": "Geodude",
    "nextEvolution": "Graveler",
    "nickname": "",
    "weight": 20
  }
```

Retorno:

```
  {
    "message": "Sucess to add this pokemon on our register",
    "pokemon": {
        "_id": "5dd83af5dcd89124844538a7",
        "type": "Rock",
        "specie": "Geodude",
        "nextEvolution": "Graveler",
        "nickname": "",
        "weight": 20
    }
  }
```

#### Listagem de pokemons:

Tipo: GET

Segurança: Token Jwt que é retornado na autenticação

Endpoint:
`/getAllPokemons`

Retorno:

```
  [
    {
      "_id": "5dd82d4ce937931b880138f3",
      "type": "Rock",
      "specie": "Geodude",
      "nextEvolution": "Graveler",
      "nickname": "",
      "weight": 20,
      "whoFoundOut": "1",
      "createdAt": "2019-11-22T18:47:40.562Z",
      "updatedAt": "2019-11-22T18:47:40.562Z",
      "__v": 0
    }
  ]

```

#### Busca de pokemon por nome:

Tipo: GET

Segurança: Token Jwt que é retornado na autenticação

Endpoint:
`http://localhost:3333/api/getPokemon?specie=Geodude`

Obs: Specie do pokemon enviada via query param

Retorno:

```
  {
    "message": "Sucess to find pokemon",
    "pokemon": {
        "_id": "5dd83af5dcd89124844538a7",
        "type": "Rock",
        "specie": "Geodude",
        "nextEvolution": "Graveler",
        "nickname": "",
        "weight": 20,
        "whoFoundOut": 2,
        "createdAt": "2019-11-22T19:45:57.438Z",
        "updatedAt": "2019-11-22T19:45:57.438Z",
        "__v": 0
    }
  }
```

#### Atualização de pokemon:

Tipo: PUT

Segurança: Token Jwt que é retornado na autenticação

Endpoint:
`/updatePokemon`

Body:

```
  {
    "name": "nome do pokemon",
    "toUpdate": {
      "type": "aqui vai o tipo do seu pokemon",
      "specie": "Aqui vai a especie do seu pokemon",
      "nextEvolution": "Caso tenha alguma evolução",
      "nickname": "Aqui vai o apelido do pokemon caso tenha",
      "weight": "Aqui vai o peso do tipo number e positivo maior que zero",
    }
  }
```

Retorno:

```
  {
    "message": "Sucess to update Geodude on register",
    "pokemon": {
      "_id": "5dd83053dca2fe128c560076",
      "type": "Rock",
      "specie": "Geodude",
      "nextEvolution": "Graveler",
      "nickname": "",
      "weight": 20
    }
  }
```

#### Excluir de pokemon:

Tipo: DELETE

Segurança: Token Jwt que é retornado na autenticação

Endpoint:
`/deletePokemon`

Body:

```
  {
    "specie": "Geodude"
  }
```

Retorno:

```
  {
    "message": "Sucess to delete Geodude for our register"
  }
```

Obs: Um pokemon so pode ser editado ou deletado por quem o cadastrou, para poder usar o serviço
é necessário ter um usuário e estar autenticado.
