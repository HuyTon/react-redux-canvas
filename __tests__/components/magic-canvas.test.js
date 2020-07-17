import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';

// Component to be tested
import MagicCanvas from '../../src/client/components/views/magic-canvas';

const mockStore = configureMockStore();
const store = mockStore({});

configure({adapter: new Adapter()});
describe('<MagicCanvas />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const wrapper = shallow(
                <Provider store={store}>
                    <MagicCanvas />
                </Provider>);
            const component = wrapper.dive();

            expect(toJson(component)).toMatchSnapshot();
        });
    });
});