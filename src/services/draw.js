import { WIDTH, HEIGHT } from '../constants';

const raf = window.requestAnimationFrame;

// force driven algorithm by fruchterman and reingold
// jacked from: https://arxiv.org/pdf/1201.3011.pdf
// sigma.js implementation: https://github.com/Linkurious/linkurious.js/blob/linkurious-version/plugins/sigma.layout.fruchtermanReingold/sigma.layout.fruchtermanReingold.js
export const makeDrawingFn = (ctx, pokedata) => {
  const keys = pokedata.keys;
  const values = pokedata.values;

  const coords = keys.map(() => ({
    pos: [
      WIDTH/2 + (Math.random() * 20) - 10,
      HEIGHT/2 + (Math.random() * 20) - 10,
    ],
    disp: [0, 0],
  }));

  // ideal distance between vertices
  const k = 0.45*Math.sqrt(WIDTH * HEIGHT/pokedata.G.v);
  const dist = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]);


  let iter = 0;
  let t = WIDTH/10;

  const draw = () => {
    if (iter < 200) {
      raf(draw);
    }

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    coords.forEach((c, i) => {
      ctx.fillText(keys[i], c.pos[0], c.pos[1]);

      pokedata.G.adj[i].forEach(a => {
        const d = coords[a];
        ctx.beginPath();
        ctx.moveTo(c.pos[0], c.pos[1]);
        ctx.lineTo(d.pos[0], d.pos[1]);
        ctx.stroke();
      });
    });

    // repulsion between vertices
    coords.forEach((v, i) => {
      let delta;
      let mag;
      let force;

      v.disp[0] = 0;
      v.disp[1] = 0;

      coords.forEach((u, j) => {
        if (i !== j) {
          delta = [
            v.pos[0] - u.pos[0],
            v.pos[1] - u.pos[1],
          ];
          mag = dist(delta);
          if (mag !== 0) {
            force = k * k / mag;
            v.disp[0] += delta[0] / mag * force;
            v.disp[1] += delta[1] / mag * force;
            u.disp[0] -= delta[0] / mag * force;
            u.disp[1] -= delta[1] / mag * force;
          }
        }
      });
    });

    // attraction btwn vertices that share edges
    pokedata.G.edges.forEach(e => {
      const idxV = values[e[0]]; const idxU = values[e[1]];
      const v = coords[idxV];
      const u = coords[idxU];
      const delta = [
        v.pos[0] - u.pos[0],
        v.pos[1] - u.pos[1],
      ];

      const mag = dist(delta);
      if (mag !== 0) {
        const force = mag * mag / k;
        coords[idxV].disp[0] -= delta[0] / mag * force;
        coords[idxV].disp[1] -= delta[1] / mag * force;
        coords[idxU].disp[0] += delta[0] / mag * force;
        coords[idxU].disp[1] += delta[1] / mag * force;
      }
    });

    // check limits
    coords.forEach(c => {
      const mag = dist(c.disp);

      if (mag !== 0) {
        c.pos[0] += (c.disp[0]/mag) * Math.min(Math.abs(c.disp[0]), t);
        c.pos[1] += (c.disp[1]/mag) * Math.min(Math.abs(c.disp[1]), t);

        c.pos[0] = Math.min(WIDTH-35, Math.max(35, c.pos[0]));
        c.pos[1] = Math.min(HEIGHT-35, Math.max(35, c.pos[1]));
      }
    });

    iter++;
    t = Math.pow(t, 0.75);
  };

  return () => raf(draw);
};
