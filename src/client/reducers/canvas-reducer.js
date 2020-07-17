import * as types from '../actions/action-types';

const initialState = {
  canvas: { canvas: { main : {}, toolbar : {} } }
};

const canvasReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_CANVAS_SUCCESS:
      return Object.assign({}, state, { canvas: action.canvas });

  }

  return state;
}

export default canvasReducer;
