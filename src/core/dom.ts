export class Dom {
  public $el: Element;
  constructor(selector: string | Element) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html?: string): string | Dom {
    if (html) {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.innerHTML.trim();
    }
  }

  clear(): Dom {
    this.html("");
    return this;
  }

  append(node: Element | Dom): void {
    if (node instanceof Dom) {
      node = node.$el;
    }
    this.$el.append(node);
  }
  on(eventType: string, handler: () => void): void {
    this.$el.addEventListener(eventType, handler);
  }
  off(eventMame: string, handler: () => void): void {
    this.$el.removeEventListener(eventMame, handler);
  }
}

export function $(selector: string | Element): Dom {
  return new Dom(selector);
}

$.create = (tagName: string, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
