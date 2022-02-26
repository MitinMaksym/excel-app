import { initialStyles } from "@/components/toolbar/Toolbar";
import { ExcelComponent } from "./ExcelComponent";

export class ExcelStateComponent extends ExcelComponent {
  public state: typeof initialStyles;

  initState(initialState: typeof initialStyles) {
    this.state = { ...initialState };
  }
  get template() {
    return JSON.stringify(this.state, null, 2);
  }

  setState(newState: Partial<typeof initialStyles>) {
    this.state = { ...this.state, ...newState };
    this.$root.html(this.template);
  }
}
