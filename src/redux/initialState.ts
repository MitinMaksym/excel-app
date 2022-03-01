import { defaultTitle, initialStyles } from "@/constants";

export type DataType<T> = { [key: string]: T };

export type AppStateType = {
  title: string;
  openedAt: string;
  colState: DataType<number>;
  rowState: DataType<number>;
  currentText: string;
  currentStyles: DataType<string>;
  dataState: DataType<string>;
  stylesState: DataType<typeof initialStyles>;
};

export const defaultState: AppStateType = {
  title: defaultTitle,
  openedAt: new Date().toJSON(),
  colState: {},
  rowState: {},
  currentText: "",
  currentStyles: {},
  dataState: {},
  stylesState: {}
};

export const normalizeState = (state: AppStateType): AppStateType => ({
  ...state,
  currentText: "",
  currentStyles: {}
});

export const normalizedInitialState = (state: AppStateType) =>
  state ? normalizeState(state) : defaultState;
