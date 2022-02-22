import { Nullable } from "@core/types";
import { Store } from "@core/createStore";
import { ActionsTypes } from "./../redux/actions";
import { Dom } from "./dom";
import { DomListener } from "./DomListener";
import { Emitter } from "./Emitter";
import { AppStateType } from "@/redux/initialState";

type ExcelComponentOptions = {
  listeners: string[];
  subscribe: string[];
  name: string;
  emitter: Emitter;
  store: Store;
};

export class ExcelComponent extends DomListener {
  private name: string;
  private emitter: Emitter;
  private unsubscribers: Array<() => void> = [];
  private subscribe: string[] = [];
  private store: Store;
  constructor(public $root: Dom, options: ExcelComponentOptions) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscribe = options.subscribe || [];
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

  protected $getState() {
    return this.store.getState();
  }

  isWatching(key: string) {
    return this.subscribe.includes(key);
  }
  
  storeChanged(state: Partial<AppStateType>) {
    console.log("state", state);
  }

  init(): void {
    this.initDOMListeners();
  }
  destroy(): void {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
