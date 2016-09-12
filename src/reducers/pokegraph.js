import I from 'immutable';
import pokemon from './pokemon.json';
import * as C from '../constants';

const INITIAL_STATE = I.Map({
  pokemon: I.List(pokemon)
    .reduce((m, p) => m.set(p.name, p), I.Map()),
  selected: I.List([]),
  graphdata: I.Map({}),
  //relation: C.POKE_RELATIONS.TYPES,
  relation: C.POKE_RELATIONS.ABILITIES,
});

const pokegraphReducer = (state = INITIAL_STATE, {type, payload} = action) => {
  switch (type) {

  case C.SELECT_POKEMON:
    return state.merge({
      selected: I.List(payload.selected),
      graphdata: I.Map(payload.graphdata),
    });

  case C.ADD_POKEMON:
    return state.update('pokemon', p => p.merge(payload));

  default:
    return state;
  }
};

export default pokegraphReducer;
