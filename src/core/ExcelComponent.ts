import { Dom } from "./dom";
import { DomListener } from "./DomListener";
import { Emitter } from "./Emitter";

type ComponentOptions = { listeners: string[]; name: string; emitter: Emitter };

export class ExcelComponent extends DomListener {
  private name: string;
  private emitter: Emitter;
  private unsubscribers: Array<() => void> = [];
  constructor(public $root: Dom, options: ComponentOptions) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
  }
  toHTML(): string {
    return "";
  }

  protected $on(event: string, fn: (data?: string) => void) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  protected $emit(event: string, data?: string) {
    this.emitter.emit(event, data);
  }

  init(): void {
    this.initDOMListeners();
  }
  destroy(): void {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
