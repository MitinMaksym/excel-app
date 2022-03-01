import { createTableItems } from "./dashboard.functions";
import { $, Dom } from "@core/dom";
import { Page } from "@core/router/Page";

export class DashboardPage extends Page {
  getRoot(): Dom {
    const now = Date.now().toString();
    return $.create("div", "db").html(` 
    <div class="db__header">
      <h1>Excel Dashboard</h1>
    </div>
    <div class="db__new">
      <div class="db__view">
        <a href="#excel/${now}" class="db__create"
          >Новая <br />
          таблица</a
        >
      </div>
    </div>
    <div class="db__table db__view">
     ${createTableItems()}
  </div>`);
  }

  afterRender(): void {
    console.log("After render");
  }
  destroy(): void {
    console.log("Dashboard destroy");
  }
}
