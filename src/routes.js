import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PokemonController from './app/controllers/PokemonController';

import authMiddleware from './app/middlewares/auth';
import { validationStoreSessionMiddleware } from './app/middlewares/validationSession';
import {
  validationStoreUserMiddleware,
  validationUpdateUserMiddleware,
} from './app/middlewares/validationUser';
import {
  validationPokemonMiddleware,
  validateUpdatePokemonMiddleware,
  validateDeletePokemonMiddleware,
} from './app/middlewares/validationPokemon';

const routes = new Router();

/**
 * @api {post} /login Login
 * @apiGroup User
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "email": "seuemailcadastrado@gmail.com",
 *      "password": "seupasswordcadasrado"
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "user": {
 *                "id": 1,
 *                "name": "Seu Nome Cadastrado",
 *                "email": "seuemailcadastrado@gmail.com",
 *              },
 *      "token": "awdiojawdoiisjvelisecaldwjljiafkamiolclc",
 *    }
 */

routes.post(
  '/api/login',
  validationStoreSessionMiddleware,
  SessionController.store
);

/**
 * @api {post} /newUser Novo usuário
 * @apiGroup User
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "name": "Seu Nome Cadastrado"
 *      "email": "seuemailcadastrado@gmail.com",
 *      "password": "seupasswordcadasrado"
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Seu Nome Cadastrado",
 *      "email": "seuemailcadastrado@gmail.com",
 *    }
 */

routes.post(
  '/api/newUser',
  validationStoreUserMiddleware,
  UserController.store
);

routes.use(authMiddleware);

/**
 * @api {put} /updateUser Atualização de usuário
 * @apiGroup User
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "name": "Aqui vai seu nome obrigatório, caso queira alterar mande um novo",
 *      "email": "Aqui vai seu email obrigatório, caso queira alterar mande um novo caso",
 *      "oldPassword": "Aqui vai sua senha antiga caso pre queira mudar",
 *      "confirmPassword": "Aqui vai sua senha nova de novo para confirmação"
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Seu Nome Cadastrado",
 *      "email": "seuemailnovocadastrado@gmail.com",
 *    }
 */

routes.put(
  '/api/updateUser',
  validationUpdateUserMiddleware,
  UserController.update
);

/**
 * @api {get} /getAllPokemons Busca todos pokemons cadastrados
 * @apiGroup Pokemon
 * @apiPermission authenticated user and must send "Bearer token"
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "_id": "5dd82d4ce937931b880138f3",
 *        "type": "Rock",
 *        "specie": "Geodude",
 *        "nextEvolution": "Graveler",
 *        "nickname": "",
 *        "weight": 20,
 *        "whoFoundOut": "1",
 *        "createdAt": "2019-11-22T18:47:40.562Z",
 *        "updatedAt": "2019-11-22T18:47:40.562Z",
 *        "__v": 0
 *      }
 *    ]
 */

routes.get('/api/getAllPokemons', PokemonController.get);

/**
 * @api {get} /getPokemon Busca pokemon por specie
 * @apiGroup Pokemon
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParam {String} specie
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *
 *    {
 *       "_id": "5dd82d4ce937931b880138f3",
 *       "type": "Rock",
 *       "specie": "Geodude",
 *       "nextEvolution": "Graveler",
 *       "nickname": "",
 *       "weight": 20,
 *       "whoFoundOut": "1",
 *       "createdAt": "2019-11-22T18:47:40.562Z",
 *       "updatedAt": "2019-11-22T18:47:40.562Z",
 *       "__v": 0
 *    }
 */

routes.get('/api/getPokemon', PokemonController.getByName);

/**
 * @api {post} /newPokemon Cadastra pokemon
 * @apiGroup Pokemon
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "type": "Rock"
 *      "specie": "Geodude",
 *      "nextEvolution": "Graveler",
 *      "nickname": "",
 *      "weight": 20
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *
 *    {
 *      "message": "Sucess to add this pokemon on our register",
 *      "pokemon": {
 *          "_id": "5dd82d4ce937931b880138f3",
 *          "type": "Rock",
 *          "specie": "Geodude",
 *          "nextEvolution": "Graveler",
 *          "nickname": "",
 *          "weight": 20,
 *       }
 *    }
 */

routes.post(
  '/api/newPokemon',
  validationPokemonMiddleware,
  PokemonController.store
);

/**
 * @api {put} /updatePokemon Atualiza dados do pokemon
 * @apiGroup Pokemon
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "specie": "Geodude",
 *      "toUpdate": {
 *        "nickname": "Apelido",
 *      }
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *
 *    {
 *      "message": "Sucess to update Geodude on register",
 *      "pokemon": {
 *          "_id": "5dd82d4ce937931b880138f3",
 *          "type": "Rock",
 *          "specie": "Geodude",
 *          "nextEvolution": "Graveler",
 *          "nickname": "Apelido",
 *          "weight": 20,
 *       }
 *    }
 */

routes.put(
  '/api/updatePokemon',
  validateUpdatePokemonMiddleware,
  PokemonController.updateByName
);

/**
 * @api {delete} /deletePokemon Delete pokemon
 * @apiGroup Pokemon
 * @apiPermission authenticated user and must send "Bearer token"
 * @apiParamExample {json} Request-Example:
 *
 *    {
 *      "specie": "Geodude",
 *    }
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *
 *    {
 *      "message": "Sucess to delete Geodude for our register",
 *    }
 */

routes.delete(
  '/api/deletePokemon',
  validateDeletePokemonMiddleware,
  PokemonController.deleteByName
);

export default routes;
