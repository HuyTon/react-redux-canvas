import * as shapeActions from '../../src/client/actions/shape-actions';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({});

describe('shape_actions', () => {
    beforeEach(() => {
        store.clearActions();
    });
    describe('getShapesSuccess', () => {
        test('Dispatches the correct action getShapesSuccess', () => {
            store.dispatch(shapeActions.getShapesSuccess('shapes'));
            expect(store.getActions()).toMatchSnapshot();
        });
    });
    describe('drawFullShape', () => {
        test('Dispatches the correct action drawFullShape', () => {
            store.dispatch(shapeActions.drawFullShape('1'));
            expect(store.getActions()).toMatchSnapshot();
        });
    });
    describe('drawSemiShape', () => {
        test('Dispatches the correct action drawSemiShape', () => {
            store.dispatch(shapeActions.drawSemiShape('1'));
            expect(store.getActions()).toMatchSnapshot();
        });
    });
    describe('removeShape', () => {
        test('Dispatches the correct action removeShape', () => {
            store.dispatch(shapeActions.removeShape('1'));
            expect(store.getActions()).toMatchSnapshot();
        });
    });
})