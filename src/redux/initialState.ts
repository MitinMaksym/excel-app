import { storage } from "@core/utils";

export type DataType<T> = { [key: string]: T };

export type AppStateType = {
  colState: DataType<number>;
  rowState: DataType<number>;
  currentText: string;
  currentStyles: DataType<string>;
  dataState: DataType<string>;
  stylesState: DataType<DataType<string>>;
};

export const defaultState = {
  colState: {},
  rowState: {},
  currentText: "",
  currentStyles: {},
  dataState: {},
  stylesState: {}
};

export const initialState = storage("excel-state")
  ? storage("excel-state")
  : defaultState;
