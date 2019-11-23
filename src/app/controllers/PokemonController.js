import Pokemon from '../schemas/Pokemon';

class PokemonController {
  async get(req, res) {
    const pokemons = await Pokemon.find().sort('createdAt');

    return res.json(pokemons);
  }

  async getByName(req, res) {
    const pokemon = await Pokemon.findOne({ specie: req.query.specie });

    if (!pokemon) {
      return res.json({ message: 'Pokemon not found' });
    }

    return res.json({ message: 'Sucess to find pokemon', pokemon });
  }

  async store(req, res) {
    const pokemon = await Pokemon.find({ specie: req.body.specie });

    if (pokemon.length > 0) {
      return res
        .status(400)
        .json({ message: 'This pokemon alreandy exists in our database' });
    }

    const {
      _id,
      type,
      specie,
      nextEvolution,
      nickname,
      weight,
    } = await Pokemon.create({
      ...req.body,
      whoFoundOut: req.userId,
    });

    return res.json({
      message: 'Sucess to add this pokemon on our register',
      pokemon: {
        _id,
        type,
        specie,
        nextEvolution,
        nickname,
        weight,
      },
    });
  }

  async updateByName(req, res) {
    const pokemon = await Pokemon.findOne({ specie: req.body.specie });

    if (pokemon.whoFoundOut === req.userId) {
      await Pokemon.findByIdAndUpdate(pokemon.id, req.body.toUpdate);

      const {
        _id,
        type,
        specie,
        nextEvolution,
        nickname,
        weight,
      } = await Pokemon.findById(pokemon.id);

      return res.json({
        message: `Sucess to update ${pokemon.specie} on register`,
        pokemon: {
          _id,
          type,
          specie,
          nextEvolution,
          nickname,
          weight,
        },
      });
    }

    return res
      .status(401)
      .json({ message: 'You dont have authorization to update this register' });
  }

  async deleteByName(req, res) {
    const pokemon = await Pokemon.findOne({ specie: req.body.specie });

    if (pokemon.whoFoundOut === req.userId) {
      await Pokemon.findByIdAndDelete(pokemon.id);

      return res.json({
        message: `Sucess to delete ${pokemon.specie} for our register`,
      });
    }

    return res
      .status(401)
      .json({ message: 'You dont have authorization to delete this register' });
  }
}

export default new PokemonController();
