export function increment(id) {
  return {
    type: 'INCREMENT',
    id
  };
}

export function addCounter(counter, increment, color) {
  return {
    type: 'ADD_COUNTER',
    counter,
    increment,
    color
  };
}