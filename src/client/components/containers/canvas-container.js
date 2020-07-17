import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import * as canvasApi from '../../services/canvas-api';
import * as shapeApi from '../../services/shape-api';
import MagicCanvas from '../views/magic-canvas';
import { loadCanvasLayout } from '../../actions/canvas-layout-actions';
import * as shapeActions from '../../actions/shape-actions';

class CanvasContainer extends React.Component {

  componentDidMount() {
    canvasApi.getCanvas();
    shapeApi.getShapes();
    store.dispatch(loadCanvasLayout('Demo Magic Canvas'));    
  }

  drawFullShape(shapeId) {
    store.dispatch(shapeActions.drawFullShape(shapeId));
  }

  drawSemiShape(shapeId) {
    store.dispatch(shapeActions.drawSemiShape(shapeId));
  }

  removeShape(shapeId) {
    store.dispatch(shapeActions.removeShape(shapeId));
  }

  render() {
    return (
      <div style={{display: 'grid'}}>
        <MagicCanvas 
          canvas={this.props.canvas.canvas} 
          shapes={this.props.shapes.shapes}
          drawFullShape={this.drawFullShape}
          drawSemiShape={this.drawSemiShape}
          removeShape={this.removeShape} />
        <div>
          <button
            className="main-bg-color btn btn-primary py-1 px-4"
            onClick={() => {
              this.drawFullShape(1);
            }}
          >
            Draw Circle
          </button>
          <button
            className="main-bg-color btn btn-primary py-1 px-4 ml-1"
            onClick={() => {
              this.drawFullShape(2);
            }}
          >
            Draw Triangle
          </button>
          <button
            className="main-bg-color btn btn-primary py-1 px-4  ml-1"
            onClick={() => {
              this.drawFullShape(3);
            }}
          >
            Draw Rectangle
          </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = function(store) {
  return {
    canvas: store.canvasState.canvas,
    shapes: store.shapeState.shapes
  };
};

export default connect(mapStateToProps)(CanvasContainer);
