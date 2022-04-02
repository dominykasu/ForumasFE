import React from 'react';
import './style.css'
import {Link} from "react-router-dom";
const Header = () => {

    return (
        <div className='d-flex justify-content-around'>
            <div className='d-flex'>
                <div>LOGO</div>
                <Link to="/">Home</Link>
            </div>
            <div className='d-flex'>
                <div>
                    <Link to="/login">Log in</Link>
                </div>
                <div>
                    <Link to="/register">Register</Link>
                </div>
            </div>

        </div>
    );
};

export default Header;