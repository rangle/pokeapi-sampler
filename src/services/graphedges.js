export const byAbilities = (pokemon) => {
  const edges = [];
  pokemon.forEach(p =>
    p.abilities.forEach(a => edges.push([p.name, a.ability.name]))
  );
  return edges;
};

export const byTypes = (pokemon) => {
  const edges = [];
  pokemon.forEach(p =>
    p.types.forEach(t => edges.push([p.name, t.type.name]))
  );
  return edges;
};

export const byMoves = (pokemon) => {
  const edges = [];
  pokemon.forEach(p =>
    p.moves.forEach(m => edges.push([p.name, m.move.name]))
  );
  return edges;
};
