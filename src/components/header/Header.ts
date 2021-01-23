import { Dom } from "./../../core/dom";
import { ExcelComponent } from "./../../core/ExcelComponent";
export class Header extends ExcelComponent {
  static className = "header";
  constructor($root: Dom) {
    super($root, { name: "Header", listeners: ["click"] });
  }
  onClick(): void {
    console.log("click in Header");
  }
  toHTML(): string {
    return `<header class="header">
    <input type="text" name="name" class="input" value="Новая таблица" />
    <div>
      <div class="button"><i class="material-icons">delete</i></div>
      <div class="button"><i class="material-icons">exit_to_app</i></div>
    </div>
  </header>`;
  }
}
