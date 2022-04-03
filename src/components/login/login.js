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
    const {setUser, getUser} = useContext(MainContext);
    let [errorMessage, setErrorMessage] = useState("");

    const inputs = {
        email: useRef(),
        password: useRef(),
    };

    // const [getUser,setUser] = useState(null)

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
                "Neteisingai įvestas el. pašto adresas. Patikrinkite jį ir bandykite dar kartą."
            );
        }

        try {
            const res = await http.post({email, password}, "login");

            if (!res.error) {
                setUser(res);
                navigate('/')


            } else {
                setErrorMessage(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div className="d-flex flex-column gap-4 mainLoginDiv">
            <div>
                <h2 className="">Log in</h2>

                <input type="email" className="mt-3 mb-3" ref={inputs.email} placeholder="Login" name="email" />
                <input type="password" className="mt-3 mb-3" ref={inputs.password} placeholder="Password" name="password" />

            </div>
            <div className="d-flex justify-content-center align-items-center text-center gap-2">
                <button onClick={login}>Log In</button>
            </div>
            {errorMessage && (
                <div className="error d-flex text-center justify-content-start justify-content-center">
                    {errorMessage}
                </div>
            )}


        </div>
    );
};

export default LogIn;