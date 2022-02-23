import { createToolbar } from "@/components/toolbar/toolbar.template";
import { ComponentOptions } from "./../Excel/Excel";
import { $, Dom } from "./../../core/dom";
import { ExcelStateComponent } from "@core/ExcelStateComponent";
export class Toolbar extends ExcelStateComponent {
  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      ...options,
      listeners: ["click"],
      subscribe: [],
      name: "Toolbar",
    });
  }
  static className = "toolbar";
  prepare(): void {
    console.log("toolbar prepare");

    // const initialState = {
    //   textAlign: "left",
    //   textDecoration: "none",
    //   fontStyle: "normal",
    //   fontWeight: "normal",
    // };

    this.state = { j: "99" };
    console.log("ccc", this);
  }
  get template() {
    console.log("template", this.state);
    return createToolbar(this.state);
  }

  toHTML(): string {
    return this.template;
  }

  onClick(e: MouseEvent) {
    if ($(e.target as HTMLElement).data.type === "button") {
      console.log($(e.target as HTMLElement).data.value);
    }
  }
}
