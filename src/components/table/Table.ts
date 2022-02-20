import { actions } from "./../../redux/actions";
import { resize } from "./table.resize";
import { Dom, $ } from "./../../core/dom";
import { createTable } from "./table.template";
import { ExcelComponent } from "./../../core/ExcelComponent";
import { TableSelection } from "./TableSelection";
import { isCell, matrix, nextSelector, shouldResize } from "./table.functions";
import { ComponentOptions } from "../Excel/Excel";
import { Key } from "@core/types";

export class Table extends ExcelComponent {
  static className = "table";
  public selection: TableSelection;
  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
    this.selection = new TableSelection();
  }

  init(): void {
    super.init();

    const $cell = this.$root.find(`div[data-id="0:0"]`);
    this.selection.selectCell($cell); // TODO create common func
    this.$emit("TABLE:SELECT", this.selection.activeCell?.text() as string);

    this.$on("FORMULA:TYPING", (data?: string) => {
      this.selection.activeCell?.html(data);
    });
    this.$on("FORMULA:DONE", () => {
      this.selection.activeCell?.focus();
    });

    this.$subscribe((state) => console.log(state));
  }
  toHTML(): string {
    return createTable(10, this.$getState());
  }

  async handleCellResize(e: MouseEvent) {
    const data = await resize(e, this.$root);
    this.$dispatch(actions.tableResize(data));
  }

  onMousedown(e: MouseEvent): void {
    const target = $(e.target as HTMLElement);

    if (shouldResize(target)) {
      this.handleCellResize(e);
    } else if (isCell(target)) {
      if (e.shiftKey && this.selection.activeCell) {
        const cells: Dom[] = matrix(this.selection.activeCell, target).map(
          (id) => this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup(cells);
      } else {
        this.selection.selectCell(target);
        this.$emit("TABLE:SELECT", this.selection.activeCell?.text() as string);
      }
    }
  }

  onKeydown(e: KeyboardEvent): void {
    const currentCellId = this.selection?.activeCell?.id(true);

    if (Object.keys(Key).includes(e.key) && !e.shiftKey && currentCellId) {
      e.preventDefault();
      const nextCellSelector = nextSelector(e.key, currentCellId);
      this.selection.selectCell(this.$root.find(nextCellSelector));
      this.$emit("TABLE:SELECT", this.selection.activeCell?.text() as string);
    }
  }

  onInput(e: InputEvent) {
    const target = e.target as HTMLDivElement;
    this.$emit("TABLE:TYPING", target.textContent ?? "");
  }
}
