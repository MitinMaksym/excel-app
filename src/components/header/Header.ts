import { actions } from "./../../redux/actions";
import { ComponentOptions } from "./../Excel/Excel";
import { Dom } from "./../../core/dom";
import { ExcelComponent } from "./../../core/ExcelComponent";
import { $ } from "@core/dom";
import { defaultTitle } from "@/constants";
export class Header extends ExcelComponent {
  static className = "header";
  constructor($root: Dom, options: ComponentOptions) {
    super($root, {
      name: "Header",
      listeners: ["click", "input"],
      subscribe: ["title"],
      ...options
    });
  }
  onClick(): void {
    console.log("click in Header");
  }
  onInput(e: InputEvent) {
    const target = $(e.target as HTMLInputElement);
    this.$dispatch(actions.changeTitle(target.text()));
  }
  toHTML(): string {
    return `<header class="header">
    <input type="text" name="name" class="input" value=${
      this.$getState().title || defaultTitle
    } />
    <div>
      <div class="button"><i class="material-icons">delete</i></div>
      <div class="button"><i class="material-icons">exit_to_app</i></div>
    </div>
  </header>`;
  }
}
