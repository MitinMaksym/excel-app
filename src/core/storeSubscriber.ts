import { AppStateType } from "@/redux/initialState";
import { Store } from "./store/createStore";
import { ExcelComponent } from "./ExcelComponent";
import { Nullable } from "./types";
import { isEqual } from "./utils";

type StoreSubscriberType = { unSubscribe(): void };
export class StoreSubscriber {
  private prevState = {};
  private store: Store;
  private sub: Nullable<StoreSubscriberType> = null;
  constructor(store: Store) {
    this.store = store;
  }

  subscribeComponents(components: ExcelComponent[]) {
    this.prevState = this.store.getState();
    this.sub = this.store.subscribe((newState: AppStateType) => {
      Object.keys(newState).forEach((key) => {
        if (
          !isEqual(
            this.prevState[key as keyof typeof this.prevState],
            newState[key as keyof typeof newState]
          )
        ) {
          components.forEach((component) => {
            if (component.isWatching(key)) {
              const changes = {
                [key]: newState[key as keyof AppStateType]
              };
              component.storeChanged(changes);
            }
          });
        }
      });
      this.prevState = JSON.parse(JSON.stringify(this.store.getState()));
      if (process.env.NODE_ENV === "development") {
        // @ts-ignore
        window.redux = this.prevState;
      }
    });
  }

  unsubscribeComponents() {
    this.sub?.unSubscribe();
  }
}
