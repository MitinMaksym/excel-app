import { InferActionsTypes } from "@core/types";

export const actions = {
  init: () =>
    ({
      type: "INIT",
    } as const),
  tableResize: (data: TableResizeData) =>
    ({
      type: "TABLE:RESIZE",
      data,
    } as const),
};

export type ActionsTypes = InferActionsTypes<typeof actions>;
export type TableResizeData = {
  type: string;
  value: { [key: string]: number };
};
