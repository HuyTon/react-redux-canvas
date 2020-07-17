import * as types from './action-types';

export const loadCanvasLayout = (title) => {
    return {
        type: types.LOAD_CANVAS_LAYOUT,
        title
    };
}
