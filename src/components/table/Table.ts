import { AppStateType } from "@/redux/initialState";
import { actions } from "./../../redux/actions";
import { resize } from "./table.resize";
import { Dom, $ } from "./../../core/dom";
import { createTable } from "./table.template";
import { ExcelComponent } from "./../../core/ExcelComponent";
import { TableSelection } from "./TableSelection";
import { isCell, matrix, nextSelector, shouldResize } from "./table.functions";
import { ComponentOptions } from "../Excel/Excel";
import { Key } from "@core/types";
import { initialStyles } from "@/constants";
import { parse } from "@core/utils";

export class Table extends ExcelComponent {
  static className = "table";
  public selection: TableSelection;
  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      subscribe: ["colState", "currentStyles"],
      ...options,
    });
    this.selection = new TableSelection();
  }

  init(): void {
    super.init();

    const $cell = this.$root.find(`div[data-id="0:0"]`);
    this.selectCell($cell);
    $cell.css(this.$getState().currentStyles);

    this.$on<string>("FORMULA:TYPING", (data) => {
      this.selection.activeCell?.attr("data-value", data).text(parse(data));
      this.updateTextInStore(data ?? "");
    });
    this.$on("FORMULA:DONE", () => {
      this.selection.activeCell?.focus();
    });
    this.$on<AppStateType["currentStyles"]>(
      "TOOLBAR:STYLES-CHANGED",
      (styles) => {
        this.$dispatch(actions.changeStyles(styles || {}));
        this.$dispatch(
          actions.saveStyles({
            id: this.selection.getIdsFromGroup,
            value: styles,
          })
        );
      }
    );
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
        this.selectCell(target);
      }
    }
  }

  onKeydown(e: KeyboardEvent): void {
    const currentCellId = this.selection?.activeCell?.id(true);

    if (Object.keys(Key).includes(e.key) && !e.shiftKey && currentCellId) {
      e.preventDefault();
      const nextCellSelector = nextSelector(e.key, currentCellId);
      this.selection.selectCell(this.$root.find(nextCellSelector));
      this.$emit("TABLE:SELECT", this.selection.activeCell?.text());
    }
  }

  onInput(e: InputEvent) {
    const target = e.target as HTMLDivElement;

    this.updateTextInStore($(target).text());
  }

  storeChanged(state: Partial<AppStateType>) {
    this.selection.applyStyles(state.currentStyles || {});
  }

  updateTextInStore(text: string) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.activeCell?.data.id ?? "",
        value: text,
      })
    );
  }

  selectCell(cell: Dom) {
    this.$dispatch(actions.clearCurrentText());
    this.selection.selectCell(cell);
    this.updateTextInStore(
      this.selection.activeCell?.attr("data-value") as string
    );
    this.$dispatch(
      actions.changeStyles(
        this.selection.activeCell?.getStyles(Object.keys(initialStyles)) || {}
      )
    );
  }
}
