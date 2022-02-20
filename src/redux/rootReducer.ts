import { ActionsTypes } from "./actions";
import { AppStateType } from "./initialState";

export type RootReducer = typeof rootReducer;

export const rootReducer = (
  state: AppStateType,
  action: ActionsTypes
): AppStateType => {
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
    case "CHANGE_TEXT":
      const dataState = state.dataState || {};
      return {
        ...state,
        currentText: action.data.value,
        dataState: { ...dataState, [action.data.id]: action.data.value },
      };
    default:
      return state;
  }
};
