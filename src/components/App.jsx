import React from 'react';
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    '.search-input' : {
        width: '50%',
        margin: '15px auto 0px auto'
    }
});

const App = () => {
    const classes = useStyles();

    return (
        <div className="ui grid">
            <div className={"ui action input " + classes[".search-input"]}>
                <input type="text" placeholder="Enter Location" />
                <button className="ui icon button">
                    <i className="search icon"></i>
                </button>
            </div>            
        </div>
    ); 
};

export default App;