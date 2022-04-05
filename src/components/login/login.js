import React from 'react';
import http from "../../plugins/http";
import {useRef} from "react";
import {useState} from "react";
import {useContext} from "react";
import MainContext from "../../context/userContext";
import {useNavigate} from "react-router-dom";
import './style.css'

const LogIn = () => {

    const navigate = useNavigate();
    const {setUser} = useContext(MainContext);
    let [errorMessage, setErrorMessage] = useState("");

    const inputs = {
        email: useRef(),
        password: useRef(),
    };


    const testEmail = (address) => {
        const regexEmail = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return regexEmail.test(address);
    };

    async function login() {

        const email = inputs.email.current.value;
        const password = inputs.password.current.value;

        if (!testEmail(email)) {
            return setErrorMessage(
                "Error in your email address."
            );
        }
        if (password.length > 50 || password.length < 5) {
            return setErrorMessage(
                "Password must be less than 50 symbols and more than 5 symbols."
            );
        }


        try {
            const res = await http.post({email, password}, "login");

            if (res.success) {
                setUser(res.user);
                navigate('/')

            } else {
                setErrorMessage(res.message);
            }
        } catch (e) {

        }
    }


    return (
        <div className="gap-4">
            <div>
                <h5 style={{"margin": "15px 0 0 10px", "color": "#ff4600"}}>Log in</h5>

                <div className="d-flex flex-column w-25 text-center loginInputDiv">
                    <input type="email" className="mt-3 mb-1" ref={inputs.email} placeholder="Login" name="email"/>
                    <input type="password" className=" mb-3" ref={inputs.password} placeholder="Password"
                           name="password"/>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center text-center gap-2">
                <button type="button" className="btn btn-dark" onClick={login}>Log In</button>
            </div>

            {errorMessage && (
                <div className="text-center mt-3">
                    {errorMessage}
                </div>
            )}


        </div>
    );
};

export default LogIn;