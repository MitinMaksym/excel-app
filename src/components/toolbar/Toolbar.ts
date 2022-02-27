import { initialState } from "./../../redux/initialState";
import { AppStateType } from "@/redux/initialState";
import { createToolbar } from "@/components/toolbar/toolbar.template";
import { ComponentOptions } from "./../Excel/Excel";
import { $, Dom } from "./../../core/dom";
import { ExcelStateComponent } from "@core/ExcelStateComponent";
import { initialStyles } from "@/constants";

export class Toolbar extends ExcelStateComponent {
  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      ...options,
      listeners: ["click"],
      subscribe: ["currentStyles"],
      name: "Toolbar"
    });
    this.prepare();
  }
  static className = "toolbar";
  prepare(): void {
    const styles = this.$getState().currentStyles;
    this.initState((styles as typeof initialState) || initialStyles);
  }
  get template() {
    return createToolbar(this.state);
  }

  toHTML(): string {
    return this.template;
  }

  storeChanged(state: Partial<AppStateType>) {
    this.setState(state.currentStyles || {});
  }

  onClick(e: MouseEvent) {
    if ($(e.target as HTMLElement).data.type === "button") {
      const values = JSON.parse($(e.target as HTMLElement).data.value);
      this.$emit("TOOLBAR:STYLES-CHANGED", values);
    }
  }
}
