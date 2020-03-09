import React, { Fragment } from "react";
import { connect } from "react-redux";
import WeatherForecastDaily from "./WeatherForecastDaily";

const WeatherForecastList = state => {
  const { weather } = state;

  if (!weather) {
    return <div id="forecast-list" className="row"></div>;
  }

  const { daily } = weather.data;
  const dailyForecastData = daily.data.slice(0, 5);
  //doing a 5 day forecast, so take first 5 days.

  const renderWeatherList = dailyForecastData => {
    return dailyForecastData.map((dailyForecast, index) => {
      return (
        <WeatherForecastDaily index={index} dailyWeather={dailyForecast} />
      );
    });
  };

  return (
    <Fragment>
      <header className="row">
        <h1> 5 Day Weather Forecast </h1>
      </header>
      <div id="forecast-list" className="row">
        {renderWeatherList(dailyForecastData)}
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return state.weather;
}

export default connect(mapStateToProps)(WeatherForecastList);
