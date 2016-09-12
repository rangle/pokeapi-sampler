import React from 'react';
import { connect } from 'react-redux';
import * as pokegraphActions from '../actions/pokegraph';
import * as C from '../constants';
import { WIDTH, HEIGHT } from '../constants';
import { makeDrawingFn } from '../services/draw';

class Canvas extends React.Component {
  componentDidMount() {
    const { props } = this;
    props.selectPokemon(C.INITIAL_POKEMON);
  }

  componentDidUpdate() {
    const { props } = this;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black';
    ctx.font = '10pt Helvetica';
    ctx.textAlign = 'center';

    const draw = makeDrawingFn(ctx, props.graphdata);
    setTimeout(() => draw(), 500);
  }

  render() {
    return (
      <canvas ref="canvas"
        className="bg-lime"
        width={WIDTH}
        height={HEIGHT} />
    );
  }
}

export default connect(
  (state) => ({
    graphdata: state.pokegraph.get('graphdata').toObject(),
  }),
  //(dispatch) => ({
    //selectPokemon: () => dispatch(pokegraphActions()),
  //})
  pokegraphActions
)(Canvas);
