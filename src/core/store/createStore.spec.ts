import { Store } from "@core/store/createStore";
import { InferActionsTypes } from "../../core/types";
import { createStore } from "./createStore";

const initialState = { count: 0 };
export const actions = {
  add: () =>
    ({
      type: "ADD",
    } as const),
};
export type ActionsTypes = InferActionsTypes<typeof actions>;

const reducer = (state: typeof initialState, action?: ActionsTypes) => {
  if (!action) return { ...state };
  if (actions.add()) {
    return { ...state, count: state.count + 1 };
  }
  return state;
};
describe("createStore", () => {
  let store: Store;
  let handler: jest.Mock<any, any>;

  beforeEach(() => {
    store = createStore<typeof initialState, ActionsTypes>(
      reducer,
      initialState
    );
    handler = jest.fn();
  });
  test("should return store object", () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.subscribe).not.toBeUndefined();
  });

  test("should return object as a state", () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test("should return default state", () => {
    expect(store.getState()).toEqual(initialState);
  });

  test("should change state if action exists", () => {
    store.dispatch(actions.add());
    expect((store.getState() as typeof initialState).count).toBe(1);
  });

  test("should call subscriber function", () => {
    store.subscribe(handler);
    store.dispatch(actions.add());
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test("should not call subscriber after unsubscribe", () => {
    const sub = store.subscribe(handler);
    sub.unSubscribe();
    store.dispatch(actions.add());
    expect(handler).not.toHaveBeenCalled();
  });

  test("should dispatch in async way", () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        store.dispatch(actions.add());
      }, 300);

      setTimeout(() => {
        expect((store.getState() as typeof initialState).count).toBe(1);
        resolve;
      }, 400);
    });
  });
});
