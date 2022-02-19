import { ActionsTypes } from "./actions";
import { InitialStateType } from "./initialState";

export type RootReducer = typeof rootReducer;
export type AppStateType = ReturnType<RootReducer>;

export const rootReducer = (state: InitialStateType, action: ActionsTypes) => {
  switch (action.type) {
    case "INIT":
      return state;
    case "TABLE:RESIZE":
      const field = action.data.type === "col" ? "colState" : "rowState";
      return {
        ...state,
        [field]: {
          ...state[field],
          ...action.data.value,
        },
      };
    default:
      return state;
  }
};
