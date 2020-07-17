import * as types from './action-types';

export const getCanvasSuccess = (canvas) => {
  return {
    type: types.GET_CANVAS_SUCCESS,
    canvas
  };
}