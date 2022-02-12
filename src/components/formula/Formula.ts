import { Dom } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { ComponentOptions } from '@core/types'

export class Formula extends ExcelComponent {
  static className = "formula";
  constructor($root: Dom, options: ComponentOptions) {
    super($root, { name: "Formula", listeners: ["input"], ...options })
  }

  toHTML(): string {
    return `
        <div class="formula__info">fx</div>
        <div class="formula__input" contenteditable spellcheck="false"></div>
      `
  }

  onInput(e: InputEvent): void {
    const target = e.target as HTMLDivElement
    this.emitter.emit("FORMULA:TYPING", target.innerHTML)
  }
}
