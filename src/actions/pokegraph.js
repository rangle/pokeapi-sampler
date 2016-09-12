import I from 'immutable';
import * as C from '../constants';
import * as pokeapi from '../api/pokeapi';
import * as pokegraph from '../services/pokegraph';
import * as graphedges from '../services/graphedges';

const grabEdges = (relation, pokemon) => {
  let edges = [];
  switch (relation) {

  case C.POKE_RELATIONS.TYPES:
    edges = graphedges.byTypes(pokemon);
    break;

  case C.POKE_RELATIONS.ABILITIES:
    edges = graphedges.byAbilities(pokemon);
    break;

  case C.POKE_RELATIONS.MOVES:
    edges = graphedges.byMoves(pokemon);
    break;

  default:
    break;
  }
  return edges;
};

const _selectPokemon = (dispatch, getState, chosen) => {
  const state = getState();
  const selected = state.pokegraph.get('pokemon')
    .filter((p, name) => chosen.indexOf(name) > -1)
    .toArray();

  const relation = state.pokegraph.get('relation');

  const edges = grabEdges(relation, selected);
  const graphdata = pokegraph.create(edges);

  dispatch({
    type: C.SELECT_POKEMON,
    payload: {
      selected,
      graphdata,
    },
  });
};

export const selectPokemon = (pokemon) =>
  (dispatch, getState) => _selectPokemon(dispatch, getState, pokemon);

export const getPokemonByColor = (color) => (dispatch, getState) => {
  pokeapi.byColor(color)
    .then(chosen => {
      const roster = getState().pokegraph.get('pokemon').map(p => p.name);
      const missing = chosen.filter(s => !roster.contains(s));

      if (missing.length === 0) {
        _selectPokemon(dispatch, getState, chosen);
        return;
      }

      pokeapi.details(missing)
        .then(found =>
          dispatch({
            type: C.ADD_POKEMON,
            payload: found.reduce((m, p) => m.set(p.name, p), I.Map()),
          })
        )
        .then(() => _selectPokemon(dispatch, getState, chosen));
    });
};

