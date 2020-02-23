import React from 'react';

import SearchBar from './SearchBar';
import WeatherForecastList from './WeatherForecastList';

const App = () => {
    return (
        <div className="ui center aligned grid">
            <SearchBar/>
            <WeatherForecastList />
        </div>
    );
};

export default App;