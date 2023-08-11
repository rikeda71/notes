import types from './actionTypes';
import * as creators from './actionCreators';
import { CreatorsToActions } from './creatorsToActions';

type State = {
  count: number;
  unit: string;
};

type Actions = CreatorsToActions<typeof creators>;

function initialState(injects?: Partial<State>): State {
  return {
    count: 0,
    unit: 'pt',
    ...injects,
  };
}

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case types.INCREMENT:
      return { ...state, count: state.count + 1 };
    case types.DECREMENT:
      return { ...state, count: state.count - 1 };
    case types.SET_COUNT:
      return { ...state, count: action.payload.amount };
    default:
      throw new Error();
  }
}

export { reducer, initialState };
