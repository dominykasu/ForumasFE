import React from 'react';
import {useRef} from "react";
import './style.css'
import MainContext from "../../context/userContext";
import {useContext} from "react";
import http from "../../plugins/http";
import {useNavigate} from "react-router-dom";

const CreateNewComment = ({index}) => {


    const commentRef = useRef()

    console.log(index)
    const {getUser} = useContext(MainContext)

    const navigate = useNavigate()



    function submitAndNav() {
        submitComment()
        navigateTo()
    }

    async function submitComment(){

        const comment = {
            comment : commentRef.current.value,
            date : Date.now(),
            creator : getUser.email,
            index: index
        };

        try {
            const res = await http.post(comment, "postComment");
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

                <div>
                    <input ref={commentRef} className="form-control inputHeight" placeholder="Text"/>
                </div>
                <div>
                    <button onClick={submitAndNav} >Submit Comment</button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewComment;