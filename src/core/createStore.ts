import { AppStateType } from "@/redux/initialState";
import { ActionsTypes } from "./../redux/actions";
import { RootReducer } from "./../redux/rootReducer";

export const createStore = (
  rootReducer: RootReducer,
  initialState: AppStateType
) => {
  let state: AppStateType = rootReducer(initialState, { type: "INIT" });
  let listeners: Array<(state: AppStateType) => void> = [];
  return {
    subscribe(listener: (state: AppStateType) => void) {
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
