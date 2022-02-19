import { storage } from "./core/utils";
import { rootReducer } from "./redux/rootReducer";
import { Table } from "./components/table/Table";
import { Formula } from "./components/formula/Formula";
import { Toolbar } from "./components/toolbar/Toolbar";
import { Header } from "./components/header/Header";
import "./scss/index.scss";
import { Excel } from "./components/Excel/Excel";
import { createStore, Store } from "@core/createStore";
import { initialState } from "./redux/initialState";

const localStorageData = storage("excel-state");
const state = localStorageData ? JSON.parse(localStorageData) : initialState;

const store: Store = createStore(rootReducer, state);
store.subscribe((state) => {
  localStorage.setItem("excel-state", JSON.stringify(state));
});
const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store: store,
});

excel.render();
