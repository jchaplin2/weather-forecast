import React from "react";

import SearchBar from "./SearchBar";
import WeatherForecastList from "./WeatherForecastList";

const App = () => {
  return (
    <main className="ui center aligned grid">
      <SearchBar />
      <WeatherForecastList />
    </main>
  );
};

export default App;
