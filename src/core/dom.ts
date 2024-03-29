import { DataType } from "@/redux/initialState";
import { CellCoords } from "@core/types";
export class Dom {
  public $el: HTMLElement;
  constructor(selector: string | HTMLElement) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }
  html(html: string): Dom;
  html(html?: string): string | Dom {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.innerHTML.trim();
    }
  }
  text(text: string): Dom;
  text(text?: undefined): string;
  text(text?: string | undefined): string | Dom {
    if (typeof text !== "undefined") {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === "input") {
      return (this.$el as HTMLInputElement).value;
    }
    return this.$el.textContent?.trim() || "";
  }

  focus = () => {
    this.$el.focus();
    return this;
  };

  clear = (): Dom => {
    this.html("");
    return this;
  };

  append = (node: Element | Dom): void => {
    if (node instanceof Dom) {
      node = node.$el;
    }
    this.$el.append(node);
  };
  on = (eventType: string, handler: () => void): void => {
    this.$el.addEventListener(eventType, handler);
  };
  off = (eventMame: string, handler: () => void): void => {
    this.$el.removeEventListener(eventMame, handler);
  };

  css = (styles: { [key: string]: string }): Dom => {
    // for (const key in styles) {
    //   this.$el.style[key] = styles[key];
    // }
    const keys = Object.keys(styles);
    keys.forEach((key) => (this.$el.style[key] = styles[key]));

    return this;
  };
  findAll = (selector: string): Dom[] => {
    const items = this.$el.querySelectorAll(selector);
    return Array.from(items).map((el) => $(el as HTMLElement));
  };
  find = (selector: string): Dom => {
    return $(this.$el.querySelector(selector) as HTMLElement);
  };
  closest = (selector: string): Dom => {
    return $(this.$el.closest(selector));
  };
  getCoords = (): DOMRect => {
    return this.$el.getBoundingClientRect();
  };
  get data(): { [key: string]: string } {
    return this.$el.dataset;
  }
  insert = (node: Dom | HTMLElement): Dom => {
    if (node instanceof Dom) {
      node = node.$el;
    }
    this.$el.append(node);
    return this;
  };
  addClass = (className: string): Dom => {
    this.$el.classList.add(className);
    return this;
  };
  removeClass = (className: string): Dom => {
    this.$el.classList.remove(className);
    return this;
  };
  id(parse?: undefined): string;
  id(parse: true): CellCoords;
  id(parse?: boolean): { row: number; col: number } | string {
    if (parse) {
      const coords = this.$el.dataset.id.split(":");
      return {
        row: +coords[0],
        col: +coords[1]
      };
    } else return this.$el.dataset.id;
  }

  getStyles(styleKeys: string[]) {
    const styles: DataType<string> = {};
    styleKeys.forEach((key: string) => {
      styles[key] = this.$el.style[key as any];
    });
    return styles;
  }
  attr(attrName: string, value: string): Dom;
  attr(attrName: string, value?: undefined): string;
  attr(attrName: string, value: string | undefined): Dom | string {
    if (value) {
      this.$el.setAttribute(attrName, value);
      return this;
    } else {
      return this.$el.getAttribute(attrName) ?? "";
    }
  }
}

export function $(selector: string | HTMLElement): Dom {
  return new Dom(selector);
}

$.create = (tagName: string, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
