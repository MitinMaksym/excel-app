import { Dom } from "./dom";
import { DomListener } from "./DomListener";

type ComponentOptions = { listeners: string[]; name: string };

export class ExcelComponent extends DomListener {
  name: string;
  constructor(public $root: Dom, options?: ComponentOptions) {
    super($root, options?.listeners);
    this.name = options?.name ?? "";
  }
  toHTML(): string {
    return "";
  }

  init(): void {
    this.initDOMListeners();
  }
  destroy(): void {
    this.removeDOMListeners();
  }
}
