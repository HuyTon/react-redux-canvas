import React from 'react';
import { connect } from 'react-redux';
import CanvasLayout from '../layouts/canvas-layout';

const mapStateToProps = function(store) {

  return {
    title: store.canvasLayoutState.title,
  };

};

export default connect(mapStateToProps)(CanvasLayout);
