import React from 'react';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

const setStyles = createUseStyles({
    'rounded-border':{
        borderRadius: "3px",
        border: "solid 1px black",
        margin: "2px"
    }
});

let darkSkyToFontAwesomeIconMap = {
    "clear-day" : "fa fa-sun",
    "clear-night": "fa fa-moon-stars",
    "rain": "fa fa-cloud-rain",
    "snow": "fa fa-snowflake",
    "sleet": "fa fa-cloud-showers-heavy",
    "wind": "fa fa-wind",
    "fog": "fa fa-smog",
    "cloudy": "fa fa-cloud",
    "partly-cloudy-day": "fa fa-cloud-sun",
    "partly-cloudy-night": "fa fa-moon-cloud",
    "hail": "fa fa-cloud-meatball",
    "thunderstorm": "fa fa-bolt",
    "tornado": "fa fa-wind"
}

const WeatherForecastList = (state) => {
        const {weather} = state;
        const classes = setStyles();
        console.log(weather);
        if(!weather) {
            return <div className="row"></div>;
        }

        const {data} = weather.daily;
        const dailyForecastData = data.slice(0,5);
        //only need 5 days.

        const getIconClass = (weatherType) => {
            let iconClass = darkSkyToFontAwesomeIconMap[weatherType];
            if(!iconClass)
                iconClass = "fa fa-wind";
            return iconClass;
        };

        const renderWeatherList = (dailyForecastData) => {
            return dailyForecastData.map(dailyForecast => {
                const classString = getIconClass(dailyForecast.icon);
                return (
                    <div className={"three wide column " + classes['rounded-border']} >
                        <i class={classString}></i>
                        {dailyForecast.summary}
                    </div>
                );
            });
        };

        return <div className="row"> { renderWeatherList(dailyForecastData) } </div>;
}

function mapStateToProps( state ) {
    return state.weather;
}

export default connect(mapStateToProps)(WeatherForecastList);