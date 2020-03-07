import { create, act } from "react-test-renderer";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import reduxPromise from "redux-promise";

import WeatherForecastList from "../../components/WeatherForecastList";

const middlewares = [reduxPromise];
const mockStore = configureMockStore(middlewares);

const weather = {
  data: {
    daily: {
      data: [
        {
          time: 1581926400,
          summary: "Clear throughout the day.",
          icon: "clear-day",
          sunriseTime: 1581951540,
          sunsetTime: 1581990720,
          humidity: 0.58,
          precipProbability: 0.08,
          precipIntensityMax: 0.0017
        },
        {
          time: 1582012800,
          summary: "Partly cloudy throughout the day.",
          icon: "partly-cloudy-day",
          sunriseTime: 1582037820,
          sunsetTime: 1582077180,
          humidity: 0.49,
          precipProbability: 0.08,
          precipIntensityMax: 0.0005
        },
        {
          time: 1582099200,
          summary: "Clear throughout the day.",
          icon: "clear-day",
          sunriseTime: 1582124160,
          sunsetTime: 1582163640,
          humidity: 0.65,
          precipProbability: 0.09,
          precipIntensityMax: 0.0008
        },
        {
          time: 1582185600,
          summary: "Partly cloudy throughout the day.",
          icon: "partly-cloudy-day",
          sunriseTime: 1582210500,
          sunsetTime: 1582250100,
          humidity: 0.62,
          precipProbability: 0.2,
          precipIntensityMax: 0.0099
        },
        {
          time: 1582272000,
          summary: "Mostly cloudy throughout the day.",
          icon: "rain",
          sunriseTime: 1582296840,
          sunsetTime: 1582336560,
          humidity: 0.71,
          precipProbability: 0.49,
          precipIntensityMax: 0.0113
        }
      ]
    }
  }
};

describe("WeatherForecastList", () => {
  let tree, store, instance;

  beforeEach(() => {
    store = mockStore({
      weather: weather
    });
    store.dispatch = jest.fn();
    tree = create(
      <Provider store={store}>
        <WeatherForecastList weather={weather} />
      </Provider>
    );
    instance = tree.root;
  });

  it("has a 5 day forecast.", () => {
    const DAYS_IN_FORECAST = 5;
    const forecastList = instance.findByProps(
      el => el.props.id === "forecast-list"
    );

    const forecastListOfDays = forecastList.findAll(el =>
      el.props.className
        ? el.props.className.includes("three wide column")
        : false
    );
    //console.log(forecastListOfDays.length);

    expect(forecastListOfDays.length).toBe(DAYS_IN_FORECAST);
  });
});
