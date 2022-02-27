import { actions, ActionsTypes } from "./actions";
import { AppStateType } from "./initialState";

export type RootReducer = typeof rootReducer;

export const rootReducer = (
  state: AppStateType,
  action: ActionsTypes
): AppStateType => {
  switch (action.type) {
    case "INIT":
      return state;
    case "CHANGE_TITLE":
      return {
        ...state,
        title: action.data
      };
    case "TABLE:RESIZE":
      const field = action.data.type === "col" ? "colState" : "rowState";
      return {
        ...state,
        [field]: {
          ...state[field],
          [action.data.id]: action.data.value
        }
      };
    case "CHANGE_TEXT":
      const dataState = state.dataState || {};
      return {
        ...state,
        currentText: action.data.value,
        dataState: {
          ...dataState,
          [action.data.id]: action.data.value
        }
      };

    case "CHANGE_STYLES":
      return {
        ...state,
        currentStyles: { ...state.currentStyles, ...action.data }
      };
    case "SAVE_STYLES":
      return {
        ...state,
        ["stylesState"]: {
          ...state.stylesState,
          ...applyStylesForIds(state, action)
        }
      };

    default:
      return state;
  }
};

const applyStylesForIds = (
  state: AppStateType,
  action: ReturnType<typeof actions.saveStyles>
) => {
  return action.data.id.reduce((acc, id) => {
    return {
      ...acc,
      [id]: { ...state.stylesState[id], ...action.data.value }
    };
  }, {});
};
