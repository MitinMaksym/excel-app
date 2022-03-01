import { AppStateType } from "@/redux/initialState";
import { InferActionsTypes } from "@core/types";

export const actions = {
  init: () =>
    ({
      type: "INIT"
    } as const),
  changeTitle: (data: string) =>
    ({
      type: "CHANGE_TITLE",
      data
    } as const),
  setOpenDate: () =>
    ({
      type: "SET_OPEN_DATE"
    } as const),
  tableResize: (data: TableResizeData) =>
    ({
      type: "TABLE:RESIZE",
      data
    } as const),
  changeText: (data: ChangeTextData) =>
    ({
      type: "CHANGE_TEXT",
      data
    } as const),
  clearCurrentText: () =>
    ({
      type: "CLEAR_CURRENT_TEXT"
    } as const),
  changeStyles: (data: AppStateType["currentStyles"]) =>
    ({
      type: "CHANGE_STYLES",
      data
    } as const),
  saveStyles: (data: { id: string[]; value: { [key: string]: string } }) =>
    ({
      type: "SAVE_STYLES",
      data
    } as const)
};

export type ActionsTypes = InferActionsTypes<typeof actions>;
export type TableResizeData = {
  type: string;
  id: string;
  value: number;
};
export type ChangeTextData = {
  id: string;
  value: string;
};
