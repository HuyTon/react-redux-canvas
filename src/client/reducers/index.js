import { combineReducers } from 'redux';

// Reducers
import canvasReducer from './canvas-reducer';
import canvasLayoutReducer from './canvas-layout-reducer';
import shapeReducer from './shape-reducer';

// Combine Reducers
var reducers = combineReducers({
    canvasState: canvasReducer,
    canvasLayoutState: canvasLayoutReducer,
    shapeState: shapeReducer
});

export default reducers;
