import { Emitter } from "./Emitter";

export enum Key {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  Shift = "Shift",
  Tab = "Tab",
  Enter = "Enter"
}

export type CellCoords = {
  row: number;
  col: number;
};

export type ComponentOptions = {
  emitter: Emitter;
};

export type Nullable<T> = T | null;
