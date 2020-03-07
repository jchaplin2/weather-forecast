import React, { Fragment } from "react";
import { createUseStyles } from "react-jss";
import { connect } from "react-redux";

const setStyles = createUseStyles({
  "rounded-border": {
    borderRadius: "3px",
    border: "solid 1px black",
    margin: "2px"
  },
  "date-header": {
    marginLeft: "-1rem",
    marginRight: "-1rem",
    borderBottom: "1px solid black"
  },
  "margin-bottom": {
    marginBottom: "1em"
  },
  "margin-top": {
    marginTop: ".5em"
  },
  "large-icon": {
    fontSize: "90px"
  }
});

let darkSkyToFontAwesomeIconMap = {
  "clear-day": "fa fa-sun yellow",
  "clear-night": "fa fa-moon-stars blue",
  rain: "fa fa-cloud-rain gray",
  snow: "fa fa-snowflake blue",
  sleet: "fa fa-cloud-showers-heavy blue",
  wind: "fa fa-wind blue",
  fog: "fa fa-smog gray",
  cloudy: "fa fa-cloud blue",
  "partly-cloudy-day": "fa fa-cloud-sun blue",
  "partly-cloudy-night": "fa fa-moon-cloud blue",
  hail: "fa fa-cloud-meatball gray",
  thunderstorm: "fa fa-bolt yellow",
  tornado: "fa fa-wind blue"
};

const WeatherForecastList = state => {
  const { weather } = state;

  if (!weather) {
    return <div id="forecast-list" className="row"></div>;
  }

  const classes = setStyles();
  const { daily } = weather.data;
  const dailyForecastData = daily.data.slice(0, 5);
  //doing a 5 day forecast, so take first 5 days.

  const getIconClass = weatherType => {
    let iconClass = darkSkyToFontAwesomeIconMap[weatherType];

    //if weather type not found show warning icon.
    if (!iconClass) iconClass = "fa fa-exclamation-triangle";

    return iconClass;
  };

  const renderWeatherList = dailyForecastData => {
    return dailyForecastData.map((dailyForecast, index) => {
      const {
        sunriseTime,
        sunsetTime,
        icon,
        humidity,
        precipProbability,
        precipIntensityMax,
        time
      } = dailyForecast;
      const classString = getIconClass(icon);
      const humidityPercent = Math.round(humidity * 100);
      const precipitationPercent = Math.round(precipProbability * 100);
      const precipitationMax = precipIntensityMax.toFixed(2);
      const sunriseDate = new Date(sunriseTime * 1000);
      const sunsetDate = new Date(sunsetTime * 1000);
      const date = new Date(time * 1000);
      const dayFormatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long"
      });
      const monthName = date.toLocaleString("default", { month: "short" });

      return (
        <div
          key={index}
          className={"three wide column " + classes["rounded-border"]}
        >
          <div className={classes["date-header"]}>
            {dayFormatter.format(date)}, {monthName}-{date.getDate()}
          </div>
          <div
            className={`${classes["margin-top"]} ${classes["margin-bottom"]} ${classes["large-icon"]}`}
          >
            <i className={classString}></i>
          </div>
          <div>Hi / Low:</div>
          <div className={classes["margin-bottom"]}>
            {dailyForecast.temperatureHigh} &deg; F /{" "}
            {dailyForecast.temperatureLow} &deg; F
          </div>
          <div className={classes["margin-bottom"]}>
            {dailyForecast.summary}
          </div>
          <div className={classes["margin-bottom"]}>
            Humidity: {humidityPercent} %
          </div>
          <div className={classes["margin-bottom"]}>
            Precipitation: {precipitationPercent} % chance ({precipitationMax}{" "}
            in.)
          </div>
          <div className={classes["margin-bottom"]}>
            Wind: {dailyForecast.windSpeed} mph
          </div>
          <div className={classes["margin-bottom"]}>
            Sunrise: {sunriseDate.getHours()}:{sunriseDate.getMinutes()} am /
            Sunset: {sunsetDate.getHours() % 12}:{sunsetDate.getMinutes()} pm
          </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div className="row">
        <h1> 5 Day Weather Forecast </h1>
      </div>
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
