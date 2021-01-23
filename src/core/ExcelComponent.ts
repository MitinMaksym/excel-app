import { Dom } from "./dom";
import { DomListener } from "./DomListener";

type ComponentOptions = { listeners: string[]; name: string };

export abstract class ExcelComponent extends DomListener {
  name: string;
  constructor(protected $root: Dom, options?: ComponentOptions) {
    super($root, options?.listeners);
    this.name = options?.name ?? "";
  }
  abstract toHTML(): string;

  init(): void {
    this.initDOMListeners();
  }
  destroy(): void {
    this.removeDOMListeners();
  }
}
