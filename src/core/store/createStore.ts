export const createStore = <S, A>(
  rootReducer: (s: S, a?: A) => S,
  initialState: S
) => {
  let state: S = rootReducer(initialState);
  let listeners: Array<(state: S) => void> = [];
  return {
    subscribe(listener: (state: S) => void) {
      listeners.push(listener);

      return {
        unSubscribe() {
          listeners = listeners.filter((l) => l !== listener);
        },
      };
    },
    dispatch(action: A) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return state;
    },
  };
};

export type Store = ReturnType<typeof createStore>;
