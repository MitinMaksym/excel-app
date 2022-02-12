import { Nullable } from "@core/types";
import { Dom } from "@core/dom";
export class TableSelection {
  public group: Dom[];
  public activeCell: Nullable<Dom> = null;
  constructor() {
    this.group = [];
  }

  static className = "row__cell--selected";

  public selectCell = (cell: Dom): void => {
    this.clear();
    cell.addClass(TableSelection.className);
    cell.focus();
    this.group.push(cell);
    this.activeCell = cell;
  };

  selectGroup(cells: Dom[]): void {
    this.clear();
    cells.forEach((cell) => {
      cell.addClass(TableSelection.className);
      this.group.push(cell);
    });
  }

  clear(): void {
    this.group.forEach((cell) => cell.removeClass(TableSelection.className));
    this.group = [];
  }
}
