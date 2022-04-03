import React from 'react';
import http from "../../plugins/http";
import {useRef} from "react";
import {useState} from "react";
import './style.css'
import {useNavigate} from "react-router-dom";
const Register = () => {

    let [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()
    const testEmail = (address) => {
        const regexEmail = new RegExp(/^[\w-\.\_]+@([\w-]+\.)+[\w-]{2,4}$/);
        return regexEmail.test(address);
    };

    const inputs = {
        email: useRef(),
        password: useRef(),
        password2: useRef(),
    };

    async function submit() {

        const user = {
            email: inputs.email.current.value,
            pass1: inputs.password.current.value,
            pass2: inputs.password2.current.value,
        };

        if (!testEmail(user.email)) {
            return setErrorMessage(
                "Neteisingai įvestas el. pašto adresas. Patikrinkite jį ir bandykite dar kartą."
            );
        }
        if (user.pass1.length > 50 || user.pass2.length < 5) {
            return setErrorMessage(
                "Slaptažodis turi būti nuo 5 iki 50 simbolių ilgio"
            );
        }
        if (user.pass1 !== user.pass2) {
            return setErrorMessage("Slaptažodiai nesutampa");
        }

        try {
            const res = await http.post(user, "registration");
            if (!res.error) {
                setErrorMessage("");
            } else {
                setErrorMessage(res.message);
            }
        } catch (error) {
            console.log(error);
        }
        navigate("/login")
    }
    return (
        <div className="d-flex flex-column gap-4 mainRegisterDiv">
            <div>
                <h2 className="">Registration</h2>
                <input type="text" className="mt-3 mb-3" ref={inputs.email} placeholder="Your email"/>
                <input type="password" className="mt-3 mb-3" ref={inputs.password} placeholder="Your password"/>
                <input type="password" className="mt-3 mb-3" ref={inputs.password2} placeholder="Confirm your password" />
            </div>

            {errorMessage && (
                <div className="error d-flex text-center justify-content-start justify-content-center">
                    {errorMessage}
                </div>
            )}

            <div className="d-flex justify-content-center align-items-center text-center gap-2">

                <button className="" onClick={() => submit()} >Register</button>

            </div>
        </div>
    );
};

export default Register;