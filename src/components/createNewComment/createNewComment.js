import React from 'react';
import {useRef} from "react";
import './style.css'
import MainContext from "../../context/userContext";
import {useContext} from "react";
import http from "../../plugins/http";


const CreateNewComment = ({index, setComment}) => {


    const commentRef = useRef()

    console.log(index)
    const {getUser, getThreadObject} = useContext(MainContext)




    async function submitComment(){

        const comment = {
            comment : commentRef.current.value,
            date : Date.now(),
            creator : getUser,
            index: index,
            threadId: getThreadObject._id

        };
        console.log(comment)
        try {
            const res = await http.post(comment, "postComment");
            if(res.success){
                setComment(res.allComments)
            }
            console.log(res)
            // if (!res.error) {
            //     setErrorMessage("");
            // } else {
            //     setErrorMessage(res.message);
            // }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="mainDiv">
            <div className="d-flex flex-column">

                <div>
                    <input ref={commentRef} className="form-control inputHeight" placeholder="Text"/>
                </div>
                <div>
                    <button onClick={submitComment} >Submit Comment</button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewComment;