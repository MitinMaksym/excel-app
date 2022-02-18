import { InferActionsTypes } from "@core/types";

export type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  test: () =>
    ({
      type: "TEST",
    } as const),
};
