import memoize from 'fast-memoize';
import { createSelector } from 'reselect';

const MOUNT_POINT = 'components/graph/layout';
const GRAPH_SIZE_SET = `${MOUNT_POINT}/GRAPH_SIZE_SET`;
const GRAPH_SELECTION_RECT_SET = `${MOUNT_POINT}/GRAPH_SELECTION_RECT_SET`;
const GRAPH_SELECTION_RECT_CLEAR = `${MOUNT_POINT}/GRAPH_SELECTION_RECT_CLEAR`;
const VIEWPORT_RESET = `${MOUNT_POINT}/VIEWPORT_RESET`;
const VIEWPORT_SET = `${MOUNT_POINT}/VIEWPORT_SET`;


/**
 * Action creator to set the current viewport date (x-axis)
 * @param {Date} date   Date of viewport
 */
export const setViewport = function ({startDate, endDate}) {
    return {
        type: VIEWPORT_SET,
        payload: {
            startDate,
            endDate
        }
    };
};

/**
 * Action create to reset the viewport to the default, 100% view.
 * @return {Object} VIEWPORT_RESET action
 */
export const resetViewport = function () {
    return {
        type: VIEWPORT_RESET
    };
};

/**
 * Returns the current viewport, or the complete range if none is selection.
 * @type {Object}
 */
export const getViewport = state => state[MOUNT_POINT].viewport;

/**
 * Sets the graph size to a given (width, height)
 * @param {Number} options.width  Width of graph container
 * @param {Number} options.height Height of graph container
 */
export const setContainerSize = function ({width, height}) {
    return {
        type: GRAPH_SIZE_SET,
        payload: {
            width,
            height
        }
    };
};

/**
 * Selector to return the current container size
 * @param  {Object} state Redux state
 * @return {Object}       Layout
 */
export const getContainerSize = state => state[MOUNT_POINT].graphSize || {
    width: 0,
    height: 0
};

/**
 * Action creator to set the graph's selection rectangle.
 * @param {Number} options.top
 * @param {Number} options.left
 * @param {Number} options.bottom
 * @param {Number} options.right
 */
export const setSelectionRect = function ({top, left, bottom, right}) {
    return {
        type: GRAPH_SELECTION_RECT_SET,
        payload: {
            top,
            left,
            bottom,
            right
        }
    };
};

export const clearSelectionRect = function () {
    return {
        type: GRAPH_SELECTION_RECT_CLEAR
    };
};

/**
 * Returns the current selection rect, or null.
 * @type {Object} {x, y, width, height}
 */
export const getSelectionRect = state => state[MOUNT_POINT].selectionRect;

/**
 * Returns the position of a chart type within the graph container.
 * @param  {String} graph Chart type identifier
 * @return {Function}     Selector for chart position
 */
export const getChartPosition = memoize(chartType => createSelector(
    getContainerSize,
    size => {
        switch (chartType) {
            case 'main':
                return {
                    x: 0,
                    y: 0,
                    width: size.width,
                    height: size.height * 0.8
                };
            case 'panner':
                return {
                    x: 0,
                    y: size.height * 0.8,
                    width: size.width,
                    height: size.height * 0.2
                };
            case 'lithography':
                return {
                    x: size.width * 0.9,
                    y: 0,
                    width: size.width * 0.1,
                    height: size.height * 0.8
                };
        }
    }
));

/**
 * Layout reducer
 * @param  {Object} state  Redux state
 * @param  {Object} action Action object
 * @return {Object}        New state
 */
export const reducer = function (state = {}, action) {
    switch (action.type) {
        case GRAPH_SIZE_SET:
            return {
                ...state,
                graphSize: {
                    width: action.payload.width,
                    height: action.payload.height
                }
            };
        case GRAPH_SELECTION_RECT_SET:
            return {
                ...state,
                selectionRect: {
                    top: action.payload.top,
                    left: action.payload.left,
                    bottom: action.payload.bottom,
                    right: action.payload.right
                }
            };
        case GRAPH_SELECTION_RECT_CLEAR:
            return {
                ...state,
                selectionRect: null
            };
        case VIEWPORT_SET:
            return {
                ...state,
                viewport: {
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate
                }
            };
        case VIEWPORT_RESET:
            return {
                ...state,
                viewport: null
            };
        default:
            return state;
    }
};

/**
 * Export the reducer keyed on the mount point, for easy usage with
 * combineReducers.
 */
export default {
    [MOUNT_POINT]: reducer
};
