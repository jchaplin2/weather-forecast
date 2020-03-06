import React, { useState } from "react";
import { fetchWeatherData } from "../actions/index";
import { createUseStyles } from "react-jss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const setStyles = createUseStyles({
  form: {
    display: "inline-block",
    width: "50%",
    margin: "15px auto 0px auto"
  },
  ".search-input": {
    width: "100%"
  }
});

const SearchBar = props => {
  const classes = setStyles();
  const [location, setLocation] = useState("");

  const handleLocationChange = event => {
    setLocation(event.target.value);
  };

  const handleClick = () => {
    props.fetchWeatherData(location);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.fetchWeatherData(location);
  };

  return (
    <div className="row">
      <form
        className={classes["form"]}
        onSubmit={event => {
          handleSubmit(event);
        }}
      >
        <div className={"ui action input " + classes[".search-input"]}>
          <input
            type="text"
            onChange={event => {
              handleLocationChange(event);
            }}
            placeholder="Enter Location"
          />
          <button
            className="ui icon button"
            onClick={() => {
              handleClick();
            }}
          >
            <i className="search icon"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeatherData }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
