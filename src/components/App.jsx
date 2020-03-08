import React from "react";

import SearchBar from "./SearchBar";
import WeatherForecastList from "./WeatherForecastList";
import WeatherForecastDaily from "./WeatherForecastDaily";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <main className="ui center aligned grid">
        <SearchBar />
        <Switch>
          <Route path="/" exact component={WeatherForecastList} />
          <Route path="/today" exact component={WeatherForecastDaily} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
