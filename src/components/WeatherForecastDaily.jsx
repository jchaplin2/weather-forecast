import React from "react";
import { createUseStyles } from "react-jss";

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
  "rain": "fa fa-cloud-rain gray",
  "snow": "fa fa-snowflake blue",
  "sleet": "fa fa-cloud-showers-heavy blue",
  "wind": "fa fa-wind blue",
  "fog": "fa fa-smog gray",
  "cloudy": "fa fa-cloud blue",
  "partly-cloudy-day": "fa fa-cloud-sun blue",
  "partly-cloudy-night": "fa fa-moon-cloud blue",
  "hail": "fa fa-cloud-meatball gray",
  "thunderstorm": "fa fa-bolt yellow",
  "tornado": "fa fa-wind blue"
};

export const WeatherForecastDaily = props => {
  const { dailyWeather, index } = props;

  const classes = setStyles();
  if (!dailyWeather) {
    return <div></div>;
  }

  const getIconClass = weatherType => {
    let iconClass = darkSkyToFontAwesomeIconMap[weatherType];

    //if weather type not found show warning icon.
    if (!iconClass) iconClass = "fa fa-exclamation-triangle";

    return iconClass;
  };

  const {
    sunriseTime,
    sunsetTime,
    icon,
    humidity,
    precipProbability,
    precipIntensityMax,
    time
  } = dailyWeather;
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
        {dailyWeather.temperatureHigh} &deg; F / {dailyWeather.temperatureLow}{" "}
        &deg; F
      </div>
      <div className={classes["margin-bottom"]}>{dailyWeather.summary}</div>
      <div className={classes["margin-bottom"]}>
        Humidity: {humidityPercent} %
      </div>
      <div className={classes["margin-bottom"]}>
        Precipitation: {precipitationPercent} % chance ({precipitationMax} in.)
      </div>
      <div className={classes["margin-bottom"]}>
        Wind: {dailyWeather.windSpeed} mph
      </div>
      <div className={classes["margin-bottom"]}>
        Sunrise: {sunriseDate.getHours()}:{sunriseDate.getMinutes()} am /
        Sunset: {sunsetDate.getHours() % 12}:{sunsetDate.getMinutes()} pm
      </div>
    </div>
  );
};

export default WeatherForecastDaily;
