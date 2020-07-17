// Reducer to be tested
import canvasLayoutReducer from '../../src/client/reducers/canvas-layout-reducer';
import {
  LOAD_CANVAS_LAYOUT,
} from '../../src/client/actions/action-types';

describe('LOAD_CANVAS_LAYOUT', () => {
  test('is correct', () => {
    const action = { type: LOAD_CANVAS_LAYOUT };

    expect(canvasLayoutReducer(undefined, action)).toMatchSnapshot();
  });
});