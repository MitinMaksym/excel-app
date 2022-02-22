import { Emitter } from "./../../core/Emitter";
import { Dom } from "./../../core/dom";
import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import { Store } from "@core/createStore";
import { StoreSubscriber } from "@core/StoreSubscriber";

export type ComponentOptions = {
  emitter: Emitter;
  store: Store;
};

type Component = {
  new ($root: Dom, options: ComponentOptions): ExcelComponent;
  className: string;
};

type Options = {
  components: Component[];
  store: Store;
};
export class Excel {
  static className = "excel";
  private components: Component[];
  private renderedComponents: Array<ExcelComponent>;
  private $el: Dom;
  private emitter: Emitter = new Emitter();
  private store: Store;
  private subscriber: StoreSubscriber;

  constructor(selector: string, options: Options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.renderedComponents = [];
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  private getRoot = (): Dom => {
    const excelRoot = $.create("div", Excel.className);
    const componentOptions: ComponentOptions = {
      emitter: this.emitter,
      store: this.store,
    };
    this.renderedComponents = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      excelRoot.append($el);
      return component;
    });
    return excelRoot;
  };

  render(): void {
    this.$el.insert(this.getRoot());
    this.subscriber.subscribeComponents(this.renderedComponents);
    this.renderedComponents.forEach((component) => {
      component.init();
    });
  }

  destroy() {
    this.renderedComponents.forEach((component) => component.destroy());
    this.subscriber.unsubscribeComponents()
  }
}
