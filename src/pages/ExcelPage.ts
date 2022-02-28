import { Excel } from "@/components/Excel/Excel";
import { Formula } from "@/components/formula/Formula";
import { Header } from "@/components/header/Header";
import { Table } from "@/components/table/Table";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { AppStateType, initialState } from "@/redux/initialState";
import { rootReducer } from "@/redux/rootReducer";
import { createStore, Store } from "@core/createStore";
import { Page } from "@core/router/Page";
import { debounce, storage } from "@core/utils";
export class ExcelPage extends Page {
  private excel: Excel;

  getRoot() {
    const store: Store = createStore(rootReducer, initialState);

    store.subscribe(
      debounce((state: AppStateType) => {
        storage("excel-state", state);
      }, 200)
    );
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store: store
    });
    return this.excel.getRoot();
  }

  afterRender(): void {
    this.excel.init();
  }
  destroy(): void {
    this.excel.destroy();
  }
}
