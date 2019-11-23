import mongoose from 'mongoose';

const PokemonSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    specie: {
      type: String,
      required: true,
    },
    nextEvolution: {
      type: String,
      required: false,
    },
    nickname: {
      type: String,
      required: false,
    },
    weight: {
      type: Number,
      required: true,
    },
    whoFoundOut: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Pokemon', PokemonSchema);
