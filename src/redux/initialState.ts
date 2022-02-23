import { storage } from "@core/utils";

export type AppStateType = typeof defaultState;

export const defaultState = {
  colState: {},
  rowState: {},
  currentText:"",
  dataState:{},
  stylesState:{
    "0:0":{
      "textAlign":"center"
    }
  }
};

export const initialState = storage("excel-state")
  ? storage("excel-state")
  : defaultState;
