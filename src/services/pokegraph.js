// takes a list of edges
// and builds a value map, key array, and Graph data (adjacency list)
export const create = (edges) => {
  const values = {};
  const keys = [];
  const adj = [];

  // cache unique vertices
  // and build empty adjacency list
  let i = 0;
  edges.forEach(e => {
    if (!values[e[0]]) {
      values[e[0]] = i; keys[i] = e[0];
      adj.push([]);
      i++;
    }
    if (!values[e[1]]) {
      values[e[1]] = i; keys[i] = e[1];
      adj.push([]);
      i++;
    }
  });

  // fill up adjacency list
  edges.forEach(e => {
    adj[values[e[0]]].push(values[e[1]]);
    adj[values[e[1]]].push(values[e[0]]);
  });

  return {
    keys,
    values,
    G: {
      v: keys.length,
      e: edges.length,
      edges,
      adj,
    },
  };
};
