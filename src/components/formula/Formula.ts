import { Dom } from "./../../core/dom";
import { ExcelComponent } from "./../../core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "formula";
  constructor($root: Dom) {
    super($root, { name: "Formula", listeners: ["input"] });
  }

  toHTML(): string {
    return `
        <div class="formula__info">fx</div>
        <div class="formula__input" contenteditable spellcheck="false"></div>
      `;
  }

  onInput(): void {
    console.log(this.$root);
  }
}
