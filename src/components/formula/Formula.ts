import { ComponentOptions } from "./../Excel/Excel";
import { Dom } from "@core/dom";
import { ExcelComponent } from "@core/ExcelComponent";
import { Key } from "@core/types";

export class Formula extends ExcelComponent {
  static className = "formula";
  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options,
    });
  }

  init(): void {
    super.init();
    const $el = this.$root.find(".formula__input");

    this.$subscribe((state) => {
      $el.text(state.currentText);
    });
    this.$on("TABLE:SELECT", (data?: string) => {
      $el.text(data);
    });
  }

  toHTML(): string {
    return `
        <div class="formula__info">fx</div>
        <div class="formula__input" contenteditable spellcheck="false"></div>
      `;
  }

  onInput(e: InputEvent): void {
    const target = e.target as HTMLDivElement;
    this.$emit("FORMULA:TYPING", target.innerHTML);
  }

  onKeydown(e: KeyboardEvent) {
    if (e.key === Key.Enter || e.key === Key.Tab) {
      e.preventDefault();
      this.$emit("FORMULA:DONE");
    }
  }
}
