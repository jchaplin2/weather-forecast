import React from 'react';
import { Link } from 'react-router-dom';
  
const NavBar = () => {

    return (
        <div className="row">
            <nav className="six wide column">
                <ul className="ui three item menu">
                    <li className={"item no-padding"}>
                        <Link className="item page-link"  to="/" > 5 Day </Link>
                    </li>
                    <li className={"item no-padding"}>
                        <Link className="item page-link"  to="/today" > Today </Link>
                    </li>
                    <li className={"item no-padding"}>
                        <Link className="item page-link"  to="/hourly" > Hourly </Link>
                    </li>
                </ul>
            </nav>                
        </div>
    );
};

export default NavBar;