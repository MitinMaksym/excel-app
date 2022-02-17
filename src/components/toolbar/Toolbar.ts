import { ComponentOptions } from "@core/types";
import { Dom } from "./../../core/dom";
import { ExcelComponent } from "@core/ExcelComponent";
export class Toolbar extends ExcelComponent {
  constructor($root: Dom, options: ComponentOptions) {
    super($root, { ...options, listeners: [], name: "Toolbar" });
  }
  static className = "toolbar";

  toHTML(): string {
    return `
        <div class="button">
          <i class="material-icons">format_align_left</i>
        </div>
        <div class="button">
          <i class="material-icons">format_align_center</i>
        </div>
        <div class="button">
          <i class="material-icons">format_align_right</i>
        </div>
        <div class="button"><i class="material-icons">format_bold</i></div>
        <div class="button"><i class="material-icons">format_italic</i></div>
        <div class="button">
          <i class="material-icons">format_inderlined</i>
        </div>
      `;
  }
}
