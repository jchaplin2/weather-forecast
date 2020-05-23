import React, { Fragment } from "react";
import { connect } from "react-redux";
import WeatherForecastDaily from "./WeatherForecastDaily";

const WEEKLY = "weekly";
const DAILY = "today";

const WeatherForecastList = props => {
  const { weather, forecastInd } = props;

  if (!weather) {
    return <div id="forecast-list" className="row"></div>;
  }

  const { daily } = weather.data;
  const numOfDays = forecastInd === WEEKLY ? 5  : 1;
  const dailyForecastData = daily.data.slice(0, numOfDays);

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
        <h1> 
          {forecastInd === WEEKLY ? "5 Day Weather Forecast" : "Today's Forecast"}
        </h1>
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
