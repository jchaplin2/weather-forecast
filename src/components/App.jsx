import React from "react";

import SearchBar from "./SearchBar";
import NavBar from './NavBar';
import WeatherForecastList from "./WeatherForecastList";
import WeatherForecastDaily from "./WeatherForecastDaily";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <main className="ui center aligned grid">
        <SearchBar />
        <NavBar />
        <Switch>
          <Route path="/" exact render={(props) => <WeatherForecastList {...props} forecastInd={`weekly`} />} />
          <Route path="/today" exact render={(props) => <WeatherForecastList {...props} forecastInd={`today`} />} />
        </Switch>
      </main>
    </Router>
  );
};



export default App;
