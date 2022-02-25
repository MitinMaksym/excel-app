import { createToolbar } from "@/components/toolbar/toolbar.template";
import { ComponentOptions } from "./../Excel/Excel";
import { $, Dom } from "./../../core/dom";
import { ExcelStateComponent } from "@core/ExcelStateComponent";

export const initialStyles = {
  textAlign: "center",
  textDecoration: "none",
  fontStyle: "normal",
  fontWeight: "normal"
};

export class Toolbar extends ExcelStateComponent {
  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      ...options,
      listeners: ["click"],
      subscribe: [],
      name: "Toolbar"
    });
    this.prepare();
  }
  static className = "toolbar";
  prepare(): void {
    this.initState(initialStyles);
  }
  get template() {
    return createToolbar(this.state);
  }

  toHTML(): string {
    return this.template;
  }

  onClick(e: MouseEvent) {
    if ($(e.target as HTMLElement).data.type === "button") {
      const values = JSON.parse($(e.target as HTMLElement).data.value);
      this.setState({ ...values });
    }
  }
}
