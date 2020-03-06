import { create, act } from "react-test-renderer";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import reduxPromise from "redux-promise";

import { fetchWeatherData } from "../../actions/index";
import SearchBar from "../../components/SearchBar";

const middlewares = [reduxPromise];
const mockStore = configureMockStore(middlewares);

describe("SearchBar", () => {
  let tree, store, instance;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    tree = create(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    instance = tree.root;
  });

  it("has an input box.", () => {
    const inputBox = instance.findAll(el => el.type === "input");
    expect(inputBox).toHaveLength(1);
  });

  it("should dispatch an action on button click.", () => {
    const location = "New York, NY";
    act(() => {
      instance
        .findByType("input")
        .props.onChange({ target: { value: location } });
    });

    act(() => {
      instance.find(el => el.type === "button").props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchWeatherData({ payload: location })
    );
  });
});
