import { Emitter } from "./../../core/Emitter";
import { Dom } from "./../../core/dom";
import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import { ComponentOptions } from "@core/types";

type Component = {
  new ($root: Dom, options: ComponentOptions): ExcelComponent;
  className: string;
};

type Options = {
  components: Component[];
};
export class Excel {
  static className = "excel";
  private components: Component[];
  private renderedComponents: Array<ExcelComponent>;
  private $el: Dom;
  public emitter: Emitter = new Emitter();

  constructor(selector: string, options: Options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.renderedComponents = [];
  }

  private getRoot = (): Dom => {
    const excelRoot = $.create("div", Excel.className);

    this.renderedComponents = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el, { emitter: this.emitter });
      $el.html(component.toHTML());
      excelRoot.append($el);
      return component;
    });
    return excelRoot;
  };

  render(): void {
    this.$el.insert(this.getRoot());
    this.renderedComponents.forEach((component) => {
      component.init();
    });
  }
}
