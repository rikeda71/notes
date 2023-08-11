import types from './actionTypes';

export function increment() {
  return { type: types.INCREMENT };
}

export function decrement() {
  return { type: types.DECREMENT };
}

export function setCount(amount: number) {
  return { type: types.SET_COUNT, payload: { amount } };
}
