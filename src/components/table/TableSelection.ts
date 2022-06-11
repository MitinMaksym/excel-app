import { DataType } from "./../../redux/initialState";
import { Nullable } from "@core/types";
import { Dom } from "@core/dom";
import { parse } from "@core/utils";
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
  get getIdsFromGroup() {
    return this.group.map((item) => item.id());
  }

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

  applyStyles(currentStyles: DataType<string> | undefined) {
    if (currentStyles) {
      this.group.forEach((cell) => cell.css(currentStyles));
    }
  }

  handleContentChange(currentData: DataType<string> | undefined) {
    if (currentData) {
      this.group.forEach((cell) => {
        const cellContent = currentData[cell.id()];
        cell.text(parse(cellContent) || "");
      });
    }
  }
}
