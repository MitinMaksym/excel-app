import { Dom } from "@core/dom";

export abstract class Page {
  private params;
  constructor(params: string) {
    this.params = params;
  }
  abstract getRoot(): Dom;

  abstract afterRender(): void;

  abstract destroy(): void;
}
