import * as canvasActions from '../../src/client/actions/canvas-actions';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({});

describe('canvas_actions', () => {
    beforeEach(() => {
        store.clearActions();
    });
    describe('getCanvasSuccess', () => {
        test('Dispatches the correct action', () => {
            store.dispatch(canvasActions.getCanvasSuccess('canvas'));
            expect(store.getActions()).toMatchSnapshot();
        });
    });
})