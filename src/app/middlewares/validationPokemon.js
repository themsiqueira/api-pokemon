import * as Yup from 'yup';

export const validationPokemonMiddleware = async (req, res, next) => {
  const schema = Yup.object().shape({
    type: Yup.string().required(),
    specie: Yup.string().required(),
    nextEvolution: Yup.string(),
    nickname: Yup.string(),
    weight: Yup.number()
      .required()
      .moreThan(0),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};

export const validateUpdatePokemonMiddleware = async (req, res, next) => {
  const schema = Yup.object().shape({
    specie: Yup.string().required(),
    toUpdate: Yup.object().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};

export const validateDeletePokemonMiddleware = async (req, res, next) => {
  const schema = Yup.object().shape({
    specie: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};
