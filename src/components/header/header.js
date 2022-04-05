import React, {useContext} from 'react';
import './style.css'
import {Link} from "react-router-dom";
import MainContext from "../../context/userContext";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const navigate = useNavigate()
    const {setUser, getUser} = useContext(MainContext);

    function logout() {
        setUser(null)
        navigate(`/`)
    }

    return (
        <div className='d-flex justify-content-around mainHeaderDiv'>
            <div className="d-flex">
                <div className='d-flex align-items-center'>
                    <img className="headerLogo"
                         src="https://cdn2.iconfinder.com/data/icons/popular-games-1/50/csgo_squircle-512.png"/>
                </div>
                <div className='d-flex align-items-center'>
                    <Link to="/">Home</Link>
                </div>
            </div>
            {getUser ?
                <div className='d-flex'>
                    <div className='d-flex align-items-center'>
                        <Link to="/likedTopics">Favorites</Link>
                    </div>
                    <div className='d-flex align-items-center'>
                        <Link to="/profile">Profile</Link>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div onClick={logout}>Sign out</div>
                    </div>

                </div>
                :
                <div className='d-flex'>
                    <div className='d-flex align-items-center'>
                        <Link to="/likedTopics">Favorites</Link>
                    </div>
                    <div className='d-flex align-items-center'>
                        <Link to="/login">Log in</Link>
                    </div>
                    <div className='d-flex align-items-center'>
                        <Link to="/register" className="registerLink">Register</Link>
                    </div>
                </div>}

        </div>
    );
};

export default Header;