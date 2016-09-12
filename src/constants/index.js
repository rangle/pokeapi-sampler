import I from 'immutable';

export const WIDTH = 900;
export const HEIGHT = 700;

export const INCREMENT_COUNTER = 'App/INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'App/DECREMENT_COUNTER';

export const SELECT_POKEMON = 'App/SELECT_POKEMON ';
export const ADD_POKEMON = 'App/ADD_POKEMON';

export const POKE_RELATIONS = {
  TYPES: 'types',
  ABILITIES: 'abilities',
  MOVES: 'moves',
};

export const POKE_URLS = {
  COLOR: {
    URL: 'api/v2/pokemon-color/',
    PLACEHOLDER: 'black',
  },
  SHAPE: {
    URL: 'api/v2/pokemon-shape/',
    PLACEHOLDER: 'ball',
  },
  HABITAT: {
    URL: 'api/v2/pokemon-habitat/',
    PLACEHOLDER: 'cave',
  },
  POKEMON: {
    URL: 'api/v2/pokemon/',
  },
};

export const INITIAL_POKEMON = [
  'bulbasaur', 'ivysaur', 'venusaur',
  'charmander', 'charmeleon', 'charizard',
  'squirtle', 'wartortle', 'blastoise',
  'caterpie', 'metapod', 'butterfree',
];
