import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('should be able to create a pokemon', async () => {
    await request(app)
      .post('/api/newUser')
      .send({
        name: 'Criador de pokemon',
        email: 'criadordepokemon@gmail.com',
        password: 'senhateste@2019',
      });

    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'criadordepokemon@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .post('/api/newPokemon')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send({
        type: 'Rock',
        specie: 'Geodude',
        nextEvolution: 'Graveler',
        nickname: '',
        weight: 20,
      })
      .expect(200);

    expect(response.body).toHaveProperty('pokemon');
  });

  it('should not be able to create a pokemon that alreandy exists', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'criadordepokemon@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .post('/api/newPokemon')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send({
        type: 'Rock',
        specie: 'Geodude',
        nextEvolution: 'Graveler',
        nickname: '',
        weight: 20,
      })
      .expect(400);

    expect(response.body).toEqual({
      message: 'This pokemon alreandy exists in our database',
    });
  });

  it('should be able to get all pokemons', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'criadordepokemon@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .get('/api/getAllPokemons')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send()
      .expect(200);

    expect(response.body).toHaveLength(1);
  });

  it('should be able to get pokemon by specie', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'criadordepokemon@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .get('/api/getPokemon?specie=Geodude')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send()
      .expect(200);

    expect(response.body).toHaveProperty('pokemon');
  });

  it('should not found pokemon by specie', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'criadordepokemon@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .get('/api/getPokemon?specie=Pikachu')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send()
      .expect(200);

    expect(response.body).toEqual({ message: 'Pokemon not found' });
  });

  it('should be able to update a pokemon', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'criadordepokemon@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .put('/api/updatePokemon')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send({
        specie: 'Geodude',
        toUpdate: { nextEvolution: '' },
      })
      .expect(200);

    expect(response.body).toHaveProperty('pokemon');
  });

  it('should not be able to update a pokemon', async () => {
    await request(app)
      .post('/api/newUser')
      .send({
        name: 'Criador de pokemon 2',
        email: 'criadordepokemon2@gmail.com',
        password: 'senhateste@2019',
      });

    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'criadordepokemon2@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .put('/api/updatePokemon')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send({
        specie: 'Geodude',
        toUpdate: { nextEvolution: '' },
      })
      .expect(401);

    expect(response.body).toEqual({
      message: 'You dont have authorization to update this register',
    });
  });

  it('should not be able to delete a pokemon', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'criadordepokemon2@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .delete('/api/deletePokemon')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send({
        specie: 'Geodude',
      })
      .expect(401);

    expect(response.body).toEqual({
      message: 'You dont have authorization to delete this register',
    });
  });

  it('should be able to delete a pokemon', async () => {
    const auth = await request(app)
      .post('/api/login')
      .send({
        email: 'criadordepokemon@gmail.com',
        password: 'senhateste@2019',
      })
      .expect(200);

    const response = await request(app)
      .delete('/api/deletePokemon')
      .set('Authorization', 'Bearer ' + auth.body.token)
      .send({
        specie: 'Geodude',
      })
      .expect(200);

    expect(response.body).toEqual({
      message: 'Sucess to delete Geodude for our register',
    });
  });
});
