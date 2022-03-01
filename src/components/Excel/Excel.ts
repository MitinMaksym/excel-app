import { actions } from "@/redux/actions";
import { Store } from "@core/createStore";
import { $, Dom } from "@core/dom";
import { Emitter } from "@core/Emitter";
import { ExcelComponent } from "@core/ExcelComponent";
import { StoreSubscriber } from "@core/storeSubscriber";

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
  private emitter: Emitter = new Emitter();
  private store: Store;
  private subscriber: StoreSubscriber;

  constructor(options: Options) {
    this.components = options.components || [];
    this.renderedComponents = [];
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  public getRoot = (): Dom => {
    const excelRoot = $.create("div", Excel.className);
    const componentOptions: ComponentOptions = {
      emitter: this.emitter,
      store: this.store
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

  init(): void {
    this.subscriber.subscribeComponents(this.renderedComponents);
    this.renderedComponents.forEach((component) => {
      component.init();
    });
    this.store.dispatch(actions.setOpenDate());
  }

  destroy() {
    this.renderedComponents.forEach((component) => component.destroy());
    this.subscriber.unsubscribeComponents();
  }
}
