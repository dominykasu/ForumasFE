import React, {useContext} from 'react';
import './style.css'
import {Link} from "react-router-dom";
import MainContext from "../../context/userContext";

const Header = () => {
    const {setUser,getUser} = useContext(MainContext);

    function logout(){
        setUser(null)
    }




    return (

        <div className='d-flex justify-content-around mainHeaderDiv'>
            <div className='d-flex'>

                <div>LOGO</div>
                <Link to="/">Home</Link>
            </div>
            {getUser ?
                <div className='d-flex'>
                    <div>
                        <Link to="/likedTopics">Favorites</Link>
                    </div>
                    <div>
                        <Link to="/profile">Profile</Link>
                    </div>
                    <div>
                        <div onClick={logout}>Sign out</div>
                    </div>

                </div>
                :
            <div className='d-flex'>
                <div>
                    <Link to="/likedTopics">Favorites</Link>
                </div>
                <div>
                    <Link to="/login">Log in</Link>
                </div>
                <div>
                    <Link to="/register" className="registerLink">Register</Link>
                </div>
            </div>}

        </div>
    );
};

export default Header;