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
                "Error in your email address."
            );
        }
        if (user.pass1.length > 50 || user.pass1.length < 5) {
            return setErrorMessage(
                "Password must be less than 50 symbols and more than 5 symbols."
            );
        }
        if (user.pass1 !== user.pass2) {
            return setErrorMessage("Passwords do not match.");
        }

        try {
            const res = await http.post(user, "registration");
            if (res.success) {
                setErrorMessage("");
            } else {
                return setErrorMessage(res.message);
            }
        } catch (error) {

        }
        navigate("/login")
    }

    return (
        <div className="gap-4">
            <div>
                <h5 style={{"margin": "15px 0 0 10px", "color": "#ff4600"}}>Registration</h5>
                <div className="d-flex flex-column w-25 text-center loginInputDiv">
                    <input type="text" className="mt-3  mb-1" ref={inputs.email} placeholder="Your email"/>
                    <input type="password" className=" mb-1" ref={inputs.password} placeholder="Your password"/>
                    <input type="password" className="mb-3" ref={inputs.password2} placeholder="Confirm your password"/>
                </div>
            </div>


            <div className="d-flex justify-content-center align-items-center text-center gap-2">

                <button type="button" className="btn btn-dark" onClick={() => submit()}>Register</button>

            </div>
            {errorMessage && (
                <div className="text-center mt-3">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default Register;