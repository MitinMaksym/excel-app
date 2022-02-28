import { ActiveRoute } from "./ActiveRoute";
import { DashboardPage } from "./../../pages/DashboardPage";
import { ExcelPage } from "./../../pages/ExcelPage";
import { $, Dom } from "@core/dom";
import { Page } from "./Page";

export type Routes = {
  dashboard: typeof DashboardPage;
  excel: typeof ExcelPage;
};

export class Router {
  private $placeholder: Dom;
  private page: Page;
  constructor(selector: string, private routes: Routes) {
    this.$placeholder = $(selector);
    this.routes = routes;
    this.hashChangeHandler = this.hashChangeHandler.bind(this);
    this.init();
  }

  init() {
    window.addEventListener("hashchange", this.hashChangeHandler);
    this.hashChangeHandler();
  }

  hashChangeHandler() {
    if (this.page) {
      this.page.destroy();
    }

    this.$placeholder.clear();
    const Page = this.pageFromHashUrl(ActiveRoute.path);
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener("hashchange", this.hashChangeHandler);
  }

  private pageFromHashUrl(path: string) {
    switch (path) {
      case "dashboard":
        return this.routes.dashboard;
      case "excel":
        return this.routes.excel;
      default:
        return this.routes.dashboard;
    }
  }
}
