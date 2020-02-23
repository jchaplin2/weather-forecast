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

        const renderWeatherList = (dailyForecastData) => {
            return dailyForecastData.map(dailyForecast => {
                return <div className={"three wide column " + classes['rounded-border']} >{dailyForecast.summary}</div>;
            });
        };

        return <div className="row"> { renderWeatherList(dailyForecastData) } </div>;
}

function mapStateToProps( state ) {
    return state.weather;
}

export default connect(mapStateToProps)(WeatherForecastList);