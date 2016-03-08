import {Record} from 'immutable';

/**
 * Record is like a class, but immutable and with default values.
 * https://facebook.github.io/immutable-js/docs/#/Record
 */
const InitialState = Record({
	width: window.innerWidth,
	height: window.innerHeight
});

export const initialState = new InitialState;

export default function browser(state = initialState, action) {
	switch (action.type) {
		case 'RESIZE_BROWSER':
			return state
					.set('width', action.payload.width)
					.set('height', action.payload.height);
		default:
			return state;
	}
}
