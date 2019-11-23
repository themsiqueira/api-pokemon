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

routes.post(
  '/api/login',
  validationStoreSessionMiddleware,
  SessionController.store
);

routes.post(
  '/api/newUser',
  validationStoreUserMiddleware,
  UserController.store
);

routes.use(authMiddleware);

routes.put(
  '/api/updateUser',
  validationUpdateUserMiddleware,
  UserController.update
);

routes.get('/api/getAllPokemons', PokemonController.get);
routes.get('/api/getPokemon', PokemonController.getByName);
routes.post(
  '/api/newPokemon',
  validationPokemonMiddleware,
  PokemonController.store
);
routes.put(
  '/api/updatePokemon',
  validateUpdatePokemonMiddleware,
  PokemonController.updateByName
);
routes.delete(
  '/api/deletePokemon',
  validateDeletePokemonMiddleware,
  PokemonController.deleteByName
);

export default routes;
