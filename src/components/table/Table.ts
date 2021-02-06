import { resize } from "./table.resize";
import { Dom } from "./../../core/dom";
import { createTable } from "./table.template";
import { ExcelComponent } from "./../../core/ExcelComponent";

export class Table extends ExcelComponent {
  static className = "table";
  constructor($root: Dom) {
    super($root, { name: "Table", listeners: ["mousedown"] });
  }

  toHTML(): string {
    return createTable();
  }

  onMousedown(e: MouseEvent): void {
    const target = e.target as HTMLElement;

    if (target.dataset.resize) {
      resize(e, this.$root);
    }
  }
}
