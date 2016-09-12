import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { POKE_URLS } from '../constants';

import UrlForm from '../components/urlform';
import PokeList from '../components/pokelist';
import * as pokegraphActions from '../actions/pokegraph';

function App({
  selected,
  getPokemonByColor,
  children,
}) {
  return (
    <div>
      { children }
      <div className="absolute right-0 top-0">
        <PokeList className="mb2" pokemon={selected}/>

        <UrlForm className="mb2"
          url={POKE_URLS.COLOR.URL}
          placeholder={POKE_URLS.COLOR.PLACEHOLDER}
          onSubmit={getPokemonByColor}/>

        <UrlForm className="mb2"
          url={POKE_URLS.SHAPE.URL}
          placeholder={POKE_URLS.SHAPE.PLACEHOLDER}
          onSubmit={()=>{}}/>

        <UrlForm className="mb2"
          url={POKE_URLS.HABITAT.URL}
          placeholder={POKE_URLS.HABITAT.PLACEHOLDER}
          onSubmit={()=>{}}/>

      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.array,
  getPokemonByColor: PropTypes.func,
};

export default connect(
  (state) => ({
    selected: state.pokegraph.get('selected')
      .map(p => p.name).toArray(),
  }),
  pokegraphActions
)(App);
