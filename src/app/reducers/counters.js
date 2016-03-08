import { Record, List } from 'immutable';
import counter from './counter';

const InitialState = Record({
  counters: List()
});
const initialState = new InitialState;

/*
* without immutable
*
export const initialState = {
  counters: []
};
*/

export default function counters(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COUNTER':

      return state.set('counters', state.counters.push(counter(undefined, action)));

      /*
      * without immutable
      *
      return Object.assign({}, state, {
        counters: [
          ...state.counters,
          counter(undefined, action)
        ]
      });
      */

    case 'INCREMENT':

      return state.set('counters', state.counters.map(s => counter(s, action)));

      /*
      * without immutable
      *
      return Object.assign({}, state, {
        counters: state.counters.map(s => counter(s, action))
      });
      */

    default:
      return state;
  }
}