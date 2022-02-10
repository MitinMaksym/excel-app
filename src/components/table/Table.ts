import { resize } from "./table.resize";
import { Dom, $ } from "./../../core/dom";
import { createTable } from "./table.template";
import { ExcelComponent } from "./../../core/ExcelComponent";
import { TableSelection } from "./TableSelection";
import { isCell, matrix, nextSelector, shouldResize } from "./table.functions";
import { Key } from "../../core/types";

export class Table extends ExcelComponent {
  static className = "table";
  public selection: TableSelection;
  constructor($root: Dom) {
    super($root, { name: "Table", listeners: ["mousedown", "keydown"] });
    this.selection = new TableSelection();
  }

  init(): void {
    super.init();

    const $cell = this.$root.find(`div[data-id="0:0"]`);
    this.selection.selectCell($cell);
  }
  toHTML(): string {
    return createTable();
  }

  onMousedown(e: MouseEvent): void {
    const target = $(e.target as HTMLElement);

    if (shouldResize(target)) {
      resize(e, this.$root);
    } else if (isCell(target)) {
      if (e.shiftKey) {
        const cells: Dom[] = matrix(this.selection.activeCell, target).map(
          (id) => this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup(cells);
      } else {
        this.selection.selectCell(target);
      }
    }
  }

  onKeydown(e: KeyboardEvent): void {
    const currentCellId = this.selection.activeCell.id(true);

    if (e.key !== Key.Shift) {
      const nextCellSelector = nextSelector(e.key, currentCellId);
      this.selection.selectCell(this.$root.find(nextCellSelector));
    }
  }
}
