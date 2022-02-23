import { ComponentOptions } from "./../Excel/Excel";
import { $, Dom } from "./../../core/dom";
import { ExcelComponent } from "@core/ExcelComponent";
import { createToolbar } from "./toolbar.template";
export class Toolbar extends ExcelComponent {
  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      ...options,
      listeners: ["click"],
      subscribe: [],
      name: "Toolbar",
    });
  }
  static className = "toolbar";

  toHTML(): string {
    const a = createToolbar();
    console.log(a);
    return a;
  }



  onClick(e: MouseEvent) {
    if ($(e.target as HTMLElement).data.type === "button") {
      console.log($(e.target as HTMLElement).data.value)
    }
  }
}
