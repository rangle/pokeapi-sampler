import 'whatwg-fetch';
import { POKE_URLS } from '../constants';

const BASE_URL = 'http://pokeapi.co/';

export const details = (pokemon) =>
  Promise.all(
    pokemon.map(p =>
      fetch(BASE_URL + POKE_URLS.POKEMON.URL + p)
        .then(res => res.json())
    )
  );

export const byColor = (color) =>
  fetch(BASE_URL + POKE_URLS.COLOR.URL + color)
    .then(res => res.json())
    .then(pokemon =>
      limitBy10(pokemon.pokemon_species).map(p => p.name)
    );

export const byShape = (shape) =>
  fetch(BASE_URL + POKE_URLS.SHAPE.URL + shape)
    .then(res => res.json())
    .then(pokemon =>
      limitBy10(pokemon.pokemon_species).map(p => p.name)
    );

export const byHabitat = (habitat) =>
  fetch(BASE_URL + POKE_URLS.HABITAT.URL + habitat)
    .then(res => res.json())
    .then(pokemon =>
      limitBy10(pokemon.pokemon_species).map(p => p.name)
    );

function limitBy10(list) {
  if (list.length <= 5) {
    return list;
  }
  return list.slice(0, 5);
}
