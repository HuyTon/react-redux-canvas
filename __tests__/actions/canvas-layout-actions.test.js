import * as canvasLayoutActions from '../../src/client/actions/canvas-layout-actions';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({});

describe('canvas_actions', () => {
    beforeEach(() => {
        store.clearActions();
    });
    describe('loadCanvasLayout', () => {
        test('Dispatches the correct action loadCanvasLayout', () => {
            store.dispatch(canvasLayoutActions.loadCanvasLayout('Demo Magic Canvas'));
            expect(store.getActions()).toMatchSnapshot();
        });
    });
})