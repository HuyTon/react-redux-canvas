import * as types from '../actions/action-types';

const initialState = {
  shapes: { shapes: [{}] }
};

const shapeReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_SHAPES_SUCCESS:
      return Object.assign({}, state, { shapes: action.shapes });
  
    case types.DRAW_FULL_SHAPE:
      let newShapes = { ...state.shapes }; // Clone shapes
      // Find the shape need to draw
      let updateShape = newShapes.shapes.find(shape => shape.id == action.shapeId);
      
      // Update properties
      updateShape.fullShape = true;
      updateShape.active = true;
      return Object.assign({}, state, { shapes: newShapes });
    
    case types.DRAW_SEMI_SHAPE:
      newShapes = { ...state.shapes }; // Clone shapes
      // Find the shape need to draw
      updateShape = newShapes.shapes.find(shape => shape.id == action.shapeId);

      // Update properties
      updateShape.fullShape = false;
      updateShape.active = true;
      return Object.assign({}, state, { shapes: newShapes });

    case types.REMOVE_SHAPE:
      newShapes = { ...state.shapes }; // Clone shapes
      // Find the shape need to remove
      updateShape = newShapes.shapes.find(shape => shape.id == action.shapeId);

      // Update properties
      updateShape.active = false;
      return Object.assign({}, state, { shapes: newShapes });
  }

  return state;
}

export default shapeReducer;
