import { Dom } from "./dom";
import { DomListener } from "./DomListener";
import { Emitter } from "./Emitter";

type ComponentOptions = { listeners: string[]; name: string; emitter: Emitter };

export class ExcelComponent extends DomListener {
  name: string;
  emitter: Emitter;
  constructor(public $root: Dom, options: ComponentOptions) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
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
