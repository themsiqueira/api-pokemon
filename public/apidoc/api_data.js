define({ "api": [
  {
    "type": "delete",
    "url": "/deletePokemon",
    "title": "Delete pokemon",
    "group": "Pokemon",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n  \"specie\": \"Geodude\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"message\": \"Sucess to delete Geodude for our register\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Pokemon",
    "name": "DeleteDeletepokemon"
  },
  {
    "type": "get",
    "url": "/getAllPokemons",
    "title": "Busca todos pokemons cadastrados",
    "group": "Pokemon",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"5dd82d4ce937931b880138f3\",\n    \"type\": \"Rock\",\n    \"specie\": \"Geodude\",\n    \"nextEvolution\": \"Graveler\",\n    \"nickname\": \"\",\n    \"weight\": 20,\n    \"whoFoundOut\": \"1\",\n    \"createdAt\": \"2019-11-22T18:47:40.562Z\",\n    \"updatedAt\": \"2019-11-22T18:47:40.562Z\",\n    \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Pokemon",
    "name": "GetGetallpokemons"
  },
  {
    "type": "get",
    "url": "/getPokemon",
    "title": "Busca pokemon por specie",
    "group": "Pokemon",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "specie",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n\n{\n   \"_id\": \"5dd82d4ce937931b880138f3\",\n   \"type\": \"Rock\",\n   \"specie\": \"Geodude\",\n   \"nextEvolution\": \"Graveler\",\n   \"nickname\": \"\",\n   \"weight\": 20,\n   \"whoFoundOut\": \"1\",\n   \"createdAt\": \"2019-11-22T18:47:40.562Z\",\n   \"updatedAt\": \"2019-11-22T18:47:40.562Z\",\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Pokemon",
    "name": "GetGetpokemon"
  },
  {
    "type": "post",
    "url": "/newPokemon",
    "title": "Cadastra pokemon",
    "group": "Pokemon",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n  \"type\": \"Rock\"\n  \"specie\": \"Geodude\",\n  \"nextEvolution\": \"Graveler\",\n  \"nickname\": \"\",\n  \"weight\": 20\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"message\": \"Sucess to add this pokemon on our register\",\n  \"pokemon\": {\n      \"_id\": \"5dd82d4ce937931b880138f3\",\n      \"type\": \"Rock\",\n      \"specie\": \"Geodude\",\n      \"nextEvolution\": \"Graveler\",\n      \"nickname\": \"\",\n      \"weight\": 20,\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Pokemon",
    "name": "PostNewpokemon"
  },
  {
    "type": "put",
    "url": "/updatePokemon",
    "title": "Atualiza dados do pokemon",
    "group": "Pokemon",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n  \"specie\": \"Geodude\",\n  \"toUpdate\": {\n    \"nickname\": \"Apelido\",\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n\n{\n  \"message\": \"Sucess to update Geodude on register\",\n  \"pokemon\": {\n      \"_id\": \"5dd82d4ce937931b880138f3\",\n      \"type\": \"Rock\",\n      \"specie\": \"Geodude\",\n      \"nextEvolution\": \"Graveler\",\n      \"nickname\": \"Apelido\",\n      \"weight\": 20,\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "Pokemon",
    "name": "PutUpdatepokemon"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "group": "User",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n  \"email\": \"seuemailcadastrado@gmail.com\",\n  \"password\": \"seupasswordcadasrado\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n            \"id\": 1,\n            \"name\": \"Seu Nome Cadastrado\",\n            \"email\": \"seuemailcadastrado@gmail.com\",\n          },\n  \"token\": \"awdiojawdoiisjvelisecaldwjljiafkamiolclc\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "User",
    "name": "PostLogin"
  },
  {
    "type": "post",
    "url": "/newUser",
    "title": "Novo usuário",
    "group": "User",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n  \"name\": \"Seu Nome Cadastrado\"\n  \"email\": \"seuemailcadastrado@gmail.com\",\n  \"password\": \"seupasswordcadasrado\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"Seu Nome Cadastrado\",\n  \"email\": \"seuemailcadastrado@gmail.com\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "User",
    "name": "PostNewuser"
  },
  {
    "type": "put",
    "url": "/updateUser",
    "title": "Atualização de usuário",
    "group": "User",
    "permission": [
      {
        "name": "authenticated user and must send \"Bearer token\""
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n  \"name\": \"Aqui vai seu nome obrigatório, caso queira alterar mande um novo\",\n  \"email\": \"Aqui vai seu email obrigatório, caso queira alterar mande um novo caso\",\n  \"oldPassword\": \"Aqui vai sua senha antiga caso pre queira mudar\",\n  \"confirmPassword\": \"Aqui vai sua senha nova de novo para confirmação\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"Seu Nome Cadastrado\",\n  \"email\": \"seuemailnovocadastrado@gmail.com\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/routes.js",
    "groupTitle": "User",
    "name": "PutUpdateuser"
  }
] });
