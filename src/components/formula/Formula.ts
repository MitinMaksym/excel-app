import { ComponentOptions } from "./../Excel/Excel";
import { Dom } from "@core/dom";
import { ExcelComponent } from "@core/ExcelComponent";
import { Key } from "@core/types";
import { AppStateType } from "@/redux/initialState";

export class Formula extends ExcelComponent {
  static className = "formula";
  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      subscribe: ["currentText"],
      ...options,
    });
  }

  init(): void {
    super.init();
  }

  storeChanged(state: Partial<AppStateType>) {
    const $el = this.$root.find(".formula__input");
    $el.text(state.currentText ?? "");
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
