import { Dom } from "./dom";
import { ExcelComponent } from "./ExcelComponent";
import { capitalizeName } from "./utils";
export class DomListener {
  constructor(protected $root: Dom, protected listeners: string[] = []) {
    if (!$root) {
      throw new Error("No root was provided for The DomListener");
    }
    this.$root = $root;
  }

  initDOMListeners(): void {
    this.listeners.forEach((listener: string) => {
      const methodName = createMethodName(listener);
      if (!this[methodName]) {
        throw new Error(
          `${
            ((this as unknown) as ExcelComponent).name
          } component doesn't have ${methodName} method`
        );
      }
      this[methodName] = this[methodName].bind(this);

      this.$root.on(listener, this[methodName]);
    });
  }

  removeDOMListeners(): void {
    this.listeners.forEach((listener) => {
      const methodName = createMethodName(listener);
      this.$root.off(listener, this[methodName]);
    });
  }
}

function createMethodName(methodName) {
  return `on${capitalizeName(methodName)}`;
}
