import { Record } from 'immutable';

let key = 0;

const InitialState = Record({
  key: 0,
  counter: 0,
  increment: 1,
  color: "black"
});
const initialState = new InitialState;

export default function counter (state = initialState /* {} */, action) {
  switch (action.type) {
    case 'ADD_COUNTER':

      key = key + 1;

      return state
        .set('key', key)
        .set('counter', action.counter ? action.counter : state.counter)
        .set('increment', action.increment ? action.increment : state.increment)
        .set('color', action.color ? action.color : state.color);

      /*
      * without immutable
      *
      return {
        key: key,
        counter: action.counter,
        increment: action.increment,
        color: action.color
      };
      */

    case 'INCREMENT':

      if (state.key !== action.id) {
        return state;
      }

      return state.set('counter', state.counter + state.increment);

      /*
      * without immutable
      *
      return {
        ...state,
        counter: state.counter + state.increment
      };
      */

    default:
      return state;
  }
}