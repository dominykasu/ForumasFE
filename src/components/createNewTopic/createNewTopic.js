import React from 'react';
import {useRef} from "react";
import './style.css'
import MainContext from "../../context/userContext";
import {useContext} from "react";
import http from "../../plugins/http";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";

const CreateNewTopic = () => {

    const {getUser} = useContext(MainContext)
    const {index} = useParams()
    const topicRef = useRef()
    const navigate = useNavigate()

    async function submitAndNav() {
        await submitTopic()
        await navigateTo()
    }

    async function submitTopic() {
        const topic = {
            topic: topicRef.current.value,
            date: Date.now(),
            creator: getUser,
            index: index
        };
        try {
            const res = await http.post(topic, "posttopic");

        } catch (error) {
            console.log(error);
        }
    }

    function navigateTo() {
        navigate(-1)
    }

    return (
        <div className="mainDiv">
            <h5 style={{"margin": "15px 0 0 10px", "color": "#ff4600"}}>New Topic</h5>
            <div className="d-flex flex-column w-75 text-center loginInputDiv">
                <input ref={topicRef} className="form-control mt-3  mb-3" placeholder="Topic"/>
            </div>

            <div className="d-flex justify-content-center align-items-center text-center gap-2">
                <button type="button" className="btn btn-dark" onClick={submitAndNav}>Create Topic</button>
            </div>
        </div>

    );
};

export default CreateNewTopic;