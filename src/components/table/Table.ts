import { createTable } from "./table.template";
import { ExcelComponent } from "./../../core/ExcelComponent";
export class Table extends ExcelComponent {
  static className = "table";

  toHTML(): string {
    return createTable();
  }
}
