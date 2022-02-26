import { AppStateType } from "@/redux/initialState";
import { InferActionsTypes } from "@core/types";

export const actions = {
  init: () =>
    ({
      type: "INIT"
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
  value: { [key: string]: number };
};
export type ChangeTextData = {
  id: string;
  value: string;
};
