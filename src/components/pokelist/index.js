import React, {PropTypes} from 'react';

const PokeList = ({ pokemon }) => {
  return (
    <div className="col-12">
    { pokemon.map(p => (
        <div key={p} className="col-6 bg-lime h4 mb1">{p}</div>)
      ) }
    </div>
  );
};

PokeList.propTypes = {
  pokemon: PropTypes.array,
};

export default PokeList;
