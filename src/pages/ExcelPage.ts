import { Excel } from "@/components/Excel/Excel";
import { Formula } from "@/components/formula/Formula";
import { Header } from "@/components/header/Header";
import { Table } from "@/components/table/Table";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { AppStateType, normalizedInitialState } from "@/redux/initialState";
import { rootReducer } from "@/redux/rootReducer";
import { createStore, Store } from "@core/store/createStore";
import { Page } from "@core/router/Page";
import { debounce, storage } from "@core/utils";

const storageName = (param: string | number) => "excel/" + param;

export class ExcelPage extends Page {
  private excel: Excel;

  getRoot() {
    const params = this.params ? this.params : Date.now();
    const initialState = storage(storageName(params));
    const store: Store = createStore(
      rootReducer,
      normalizedInitialState(initialState)
    );

    store.subscribe(
      debounce((state: AppStateType) => {
        storage(storageName(params), state);
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
