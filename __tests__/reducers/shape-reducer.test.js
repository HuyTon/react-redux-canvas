// Reducer to be tested
import shapeReducer from '../../src/client/reducers/shape-reducer';
import {
  GET_SHAPES_SUCCESS,
  DRAW_FULL_SHAPE,
  DRAW_SEMI_SHAPE,
  REMOVE_SHAPE
} from '../../src/client/actions/action-types';

describe('GET_SHAPES_SUCCESS', () => {
  test('is correct', () => {
    const action = { type: GET_SHAPES_SUCCESS };

    expect(shapeReducer(undefined, action)).toMatchSnapshot();
  });
});

describe('DRAW_FULL_SHAPE', () => {
  test('is correct', () => {
    const action = { type: DRAW_FULL_SHAPE };

    expect(shapeReducer(undefined, action)).toMatchSnapshot();
  });
});

describe('DRAW_SEMI_SHAPE', () => {
  test('is correct', () => {
    const action = { type: DRAW_SEMI_SHAPE };

    expect(shapeReducer(undefined, action)).toMatchSnapshot();
  });
});

describe('REMOVE_SHAPE', () => {
  test('is correct', () => {
    const action = { type: REMOVE_SHAPE };

    expect(shapeReducer(undefined, action)).toMatchSnapshot();
  });
});