import { InitialStateType } from "@/redux/initialState";
import { ActionsTypes } from "./../redux/actions";
import { RootReducer, AppStateType } from "./../redux/rootReducer";

export const createStore = (
  rootReducer: RootReducer,
  initialState: InitialStateType
) => {
  let state: AppStateType = rootReducer(initialState, { type: "TEST" });
  let listeners: Array<(state: AppStateType) => void> = [];
  return {
    subscribe(listener: (state: object) => void) {
      listeners.push(listener);

      return {
        unSubscribe() {
          listeners = listeners.filter((l) => l !== listener);
        },
      };
    },
    dispatch(action: ActionsTypes) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return state;
    },
  };
};

export type Store = ReturnType<typeof createStore>;
