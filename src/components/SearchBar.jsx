import React, {useState} from 'react';
import axios from 'axios';
import {createUseStyles} from 'react-jss'

const API_KEY = '7650d1c9ec87898004f754e19e5b71ae';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&q=`;

const setStyles = createUseStyles({
    'form':{
        display: 'inline-block',
        width: '50%',
        margin: '15px auto 0px auto'
    },
    '.search-input' : {
        width: '100%'
    }
});

const SearchBar = () => {
    const classes = setStyles();
    const [location, setLocation] = useState('');

    const fetchWeatherData = async () => {
        const url = ROOT_URL + location;
        const response = await axios.get(url);
        console.log(response);
    };

    const handleLocationChange = event => {
        setLocation(event.target.value);
    };

    const handleClick = () => {
        fetchWeatherData();
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData();
    }

    return (
        <div className="ui grid">
            <form className={classes["form"]} onSubmit={handleSubmit}>
                <div className={"ui action input " + classes[".search-input"]}>
                        <input type="text" onChange={handleLocationChange} placeholder="Enter Location" />
                        <button className="ui icon button" onClick={handleClick}>
                            <i className="search icon" ></i>
                        </button>
                </div>
            </form> 
        </div>
    );

}

export default SearchBar;