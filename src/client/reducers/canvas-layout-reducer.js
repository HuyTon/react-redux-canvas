import * as types from '../actions/action-types';

const initialState = {
    title: ''
}

const canvasLayoutReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.LOAD_CANVAS_LAYOUT:
            return Object.assign({}, state, {
                title: action.title
            });
    }

    return state;
}

export default canvasLayoutReducer;