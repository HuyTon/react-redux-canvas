import * as types from './action-types';

export const getShapesSuccess = (shapes) => {
  return {
    type: types.GET_SHAPES_SUCCESS,
    shapes
  };
}

export const drawFullShape = (shapeId) => {
  return {
    type: types.DRAW_FULL_SHAPE,
    shapeId
  };
}

export const drawSemiShape = (shapeId) => {
  return {
    type: types.DRAW_SEMI_SHAPE,
    shapeId
  };
}

export const removeShape = (shapeId) => {
  return {
    type: types.REMOVE_SHAPE,
    shapeId
  };
}