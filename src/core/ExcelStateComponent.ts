import { ExcelComponent } from "./ExcelComponent";

export class ExcelStateComponent extends ExcelComponent {
  public state: { [key: string]: string } = {};
  constructor(...args: any) {
    //@ts-ignore
    super(...args);
  }
  get template() {
    return JSON.stringify(this.state, null, 2);
  }

  initiateState(initialState = {}) {
    this.state = { ...initialState };
  }

  setState(newState: { [key: string]: string }) {
    this.state = { ...this.state, ...newState };
    this.$root.html(this.template);
  }
}
