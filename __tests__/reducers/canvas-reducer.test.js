// Reducer to be tested
import canvasReducer from '../../src/client/reducers/canvas-reducer';
import {
    GET_CANVAS_SUCCESS,
} from '../../src/client/actions/action-types';

describe('GET_CANVAS_SUCCESS', () => {
    test('is correct', () => {
        const action = { type: GET_CANVAS_SUCCESS };

        expect(canvasReducer(undefined, action)).toMatchSnapshot();
    });
});