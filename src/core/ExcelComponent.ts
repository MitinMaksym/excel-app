import { Nullable } from "@core/types";
import { AppStateType } from "@/redux/rootReducer";
import { Store } from "@core/createStore";
import { ActionsTypes } from "./../redux/actions";
import { Dom } from "./dom";
import { DomListener } from "./DomListener";
import { Emitter } from "./Emitter";

type ExcelComponentOptions = {
  listeners: string[];
  name: string;
  emitter: Emitter;
  store: Store;
};

export class ExcelComponent extends DomListener {
  private name: string;
  private emitter: Emitter;
  private unsubscribers: Array<() => void> = [];
  private storeSub: Nullable<ReturnType<typeof this.store.subscribe>> = null;

  private store: Store;
  constructor(public $root: Dom, options: ExcelComponentOptions) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.store = options.store;
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

  protected $dispatch(action: ActionsTypes) {
    this.store.dispatch(action);
  }

  protected $subscribe(fn: (state: AppStateType) => void) {
    this.storeSub = this.store.subscribe(fn);
  }

  init(): void {
    this.initDOMListeners();
  }
  destroy(): void {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    this.storeSub?.unSubscribe();
  }
}
