import { actions } from "@/redux/actions";
import { $, Dom } from "@core/dom";
import { ExcelComponent } from "@core/ExcelComponent";
import { ActiveRoute } from "@core/router/ActiveRoute";
import { ComponentOptions } from "../Excel/Excel";
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

  init(): void {
    super.init();
  }
  onClick(e: MouseEvent): void {
    const target = $(e.target as HTMLElement);
    if (target.data.button === "exit") {
      ActiveRoute.navigate("#dashboard");
      return;
    }
    if (target.data.button === "delete") {
      const decision = confirm("Вы действительно хотите удалить эту таблицу");
      if (decision) {
        window.localStorage.removeItem("excel/" + ActiveRoute.param);
        ActiveRoute.navigate("#dashboard");
      }
    }
  }
  onInput(e: InputEvent) {
    const target = $(e.target as HTMLInputElement);
    this.$dispatch(actions.changeTitle(target.text()));
  }
  toHTML(): string {
    const title = this.$getState().title;
    return `<header class="header">
    <input type="text" name="name" class="input" value="${title}"/>
    <div>
      
      <div class="button" data-button="delete">
        <i class="material-icons" data-button="delete">delete</i>
      </div>
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
    </div>
  </header>`;
  }
}
