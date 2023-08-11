type State = {
  count: number;
  unit: string;
};

export const initialState: State = {
  count: 0,
  unit: 'pt',
};

// action: anyは適切ではない
export function reducer(state: State, action: any) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    default:
      throw new Error();
  }
}
