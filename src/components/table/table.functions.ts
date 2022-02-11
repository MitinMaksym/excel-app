import { CellCoords, Key } from "./../../core/types";
import { Dom } from "./../../core/dom";
import { range } from "../../core/utils";

export function isCell(target: Dom): boolean {
  return target.data.type === "cell";
}
export function shouldResize(target: Dom): boolean {
  return !!target.data.resize;
}

export function matrix($current: Dom, $target: Dom): string[] {
  const targetCoords = $target.id(true) as CellCoords;
  const currentCoords = $current.id(true) as CellCoords;
  const rows = range(targetCoords.row, currentCoords.row);
  const cols = range(targetCoords.col, currentCoords.col);
  const ids = rows.reduce((acc, row) => {
    cols.forEach((col) => {
      acc.push(`${row}:${col}`);
    });
    return acc;
  }, []);
  return ids;
}

export const nextSelector = (key: string, currentCell: CellCoords): string => {
  let { row, col } = currentCell;
  const MIN = 0;
  switch (key) {
    case Key.ArrowLeft:
      col - 1 < MIN ? col : --col;
      break;
    case Key.ArrowRight:
    case Key.Tab:
      col++;
      break;

    case Key.ArrowUp:
      row - 1 < MIN ? row : row--;
      break;
    case Key.ArrowDown:
    case Key.Enter:
      row++;
      break;
  }

  return `[data-id="${row}:${col}"]`;
};
