import { ActionsTypes } from "./actions";
import { InitialStateType } from "./initialState";

export type RootReducer = typeof rootReducer;
export type AppStateType = ReturnType<RootReducer>;

export const rootReducer = (state: InitialStateType, action: ActionsTypes) => {
  switch (action.type) {
    case "TEST":
      return state;
  }
  return state;
};
