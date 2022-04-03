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
    const textRef = useRef()
    const navigate = useNavigate()

    function submitAndNav() {
        submitTopic()
        navigateTo()
        // console.log(index)
    }


   async function submitTopic(){

       const topic = {
           topic : topicRef.current.value,
           contentText : textRef.current.value,
           date : Date.now(),
           creator : getUser.email,
           index : index
       };

       try {
           const res = await http.post(topic, "posttopic");
           // if (!res.error) {
           //     setErrorMessage("");
           // } else {
           //     setErrorMessage(res.message);
           // }
       } catch (error) {
           console.log(error);
       }

    }
    function navigateTo(){
        navigate(-1)
    }
    return (
        <div className="mainDiv">
            <div className="d-flex flex-column">
                <div className="col-4">
                    <input ref={topicRef} className="form-control" placeholder="Topic"/>
                </div>
                <div>
                    <input ref={textRef} className="form-control inputHeight" placeholder="Text"/>
                </div>
                <div>
                    <button onClick={submitAndNav} >Submit</button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewTopic;