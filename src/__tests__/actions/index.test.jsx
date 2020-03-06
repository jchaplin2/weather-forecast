import configureMockStore from "redux-mock-store";
import reduxPromise from "redux-promise";
import moxios from "moxios";
import { FETCH_WEATHER, fetchWeatherData } from "../../actions/index.jsx";

export const fetchWeatherDataMock = {
  weather: {
    daily: {
      data: [
        { time: 1581926400 },
        { time: 1581926400 },
        { time: 1581926400 },
        { time: 1581926400 },
        { time: 1581926400 },
        { time: 1581926400 }
      ]
    }
  }
};

describe("actions", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("can get the weather data of a city and state in the US", done => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: fetchWeatherDataMock
      });
      done();
    }, 1000);

    const expectedActions = [{ type: FETCH_WEATHER }];
    const middlewares = [reduxPromise];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ weather: {} });

    store.dispatch(fetchWeatherData("New York, NY")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
