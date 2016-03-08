import { Record, List } from 'immutable';
import counter from './counter';
import { NICE, SUPER_NICE } from '../common/constants';

const InitialState = Record({
  counters: List([
    counter(undefined, {
      type: 'ADD_COUNTER',
      counter: 0,
      increment: 1,
      color: NICE
    }),
    counter(undefined, {
      type: 'ADD_COUNTER',
      counter: 0,
      increment: 5,
      color: SUPER_NICE
    }),
    counter(undefined, {
      type: 'ADD_COUNTER',
      counter: 0,
      increment: 3
    }),
    counter(undefined, {
      type: 'ADD_COUNTER',
    }),
    counter(undefined, {
      type: 'ADD_COUNTER',
      counter: 100,
      increment: undefined,
      color: 'blue'
    })
  ])
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