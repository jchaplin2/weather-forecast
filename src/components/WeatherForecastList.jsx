import React from 'react';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

const setStyles = createUseStyles({
    'rounded-border':{
        borderRadius: "3px",
        border: "solid 1px black",
        margin: "2px"
    },
    'yellow': {
        color: "#F0E68C"
    },
    'blue':{
        color:'#67C8FF'
    },
    'gray':{
        color:'#708090'
    }
});

const WeatherForecastList = (state) => {
        const {weather} = state;
        const classes = setStyles();

        let darkSkyToFontAwesomeIconMap = {
            "clear-day" : "fa fa-sun " + classes['yellow'],
            "clear-night": "fa fa-moon-stars "+ classes['blue'],
            "rain": "fa fa-cloud-rain " + classes['gray'],
            "snow": "fa fa-snowflake "+ classes['blue'],
            "sleet": "fa fa-cloud-showers-heavy",
            "wind": "fa fa-wind" + classes['blue'],
            "fog": "fa fa-smog " + classes['gray'],
            "cloudy": "fa fa-cloud "+ classes['blue'],
            "partly-cloudy-day": "fa fa-cloud-sun "+ classes['blue'],
            "partly-cloudy-night": "fa fa-moon-cloud "+ classes['blue'],
            "hail": "fa fa-cloud-meatball " + classes['gray'],
            "thunderstorm": "fa fa-bolt "+ classes['yellow'],
            "tornado": "fa fa-wind "+ classes['blue']
        }

        if(!weather) {
            return <div className="row"></div>;
        }

        const {data} = weather.daily;
        const dailyForecastData = data.slice(0,5);
        //doing a 5 day forecast, so only need 5 days.

        const getIconClass = (weatherType) => {
            let iconClass = darkSkyToFontAwesomeIconMap[weatherType];
            //TODO: default icon.
            if(!iconClass)
                iconClass = "fa fa-wind";
            return iconClass;
        };

        const renderWeatherList = (dailyForecastData) => {
            return dailyForecastData.map((dailyForecast, index) => {
                const classString = getIconClass(dailyForecast.icon);
                const humidityPercent = Math.round(dailyForecast.humidity * 100);
                const precipitationPercent = dailyForecast.precipProbability * 100;
                const precipitationMax = dailyForecast.precipIntensityMax.toFixed(2);

                const {sunriseTime, sunsetTime} = dailyForecast;
                const sunriseDate = new Date(sunriseTime * 1000);
                const sunsetDate = new Date(sunsetTime * 1000);

                return (
                    //TODO refactor styles.
                    <div key={index} className={"three wide column " + classes['rounded-border']} >
                        <div style={{"fontSize":"90px","marginBottom":"25px","marginTop":"25px"}}>
                            <i className={classString}></i>
                        </div>
                        <div>Hi / Low:</div>
                        <div style={{"marginBottom":"25px"}} >{dailyForecast.temperatureHigh} / {dailyForecast.temperatureLow}</div>
                        <div style={{"marginBottom":"25px"}}>
                            {dailyForecast.summary}
                        </div>

                        <div style={{"marginBottom":"25px"}} >Humidity: { humidityPercent } %</div>
                        <div style={{"marginBottom":"25px"}} >Precipitation: {precipitationPercent} % chance  ({precipitationMax} in.)</div>
                        <div style={{"marginBottom":"25px"}} >Wind: {dailyForecast.windSpeed} mph </div>
                        <div style={{"marginBottom":"25px"}} > Sunrise: {sunriseDate.getHours()}:{sunriseDate.getMinutes()}am / Sunset: {sunsetDate.getHours() % 12}:{sunsetDate.getMinutes()}pm </div>
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