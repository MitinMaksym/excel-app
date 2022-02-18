import { Store } from "./createStore";
import { Emitter } from "./Emitter";

export enum Key {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  Shift = "Shift",
  Tab = "Tab",
  Enter = "Enter",
}

export type CellCoords = {
  row: number;
  col: number;
};

export type ComponentOptions = {
  emitter: Emitter;
  store: Store;
};

export type Nullable<T> = T | null;

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
