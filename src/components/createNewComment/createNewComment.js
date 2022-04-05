import React, {useState} from 'react';
import {useRef} from "react";
import MainContext from "../../context/userContext";
import {useContext} from "react";
import http from "../../plugins/http";

const CreateNewComment = ({index, setComment}) => {

    let [errorMessage, setErrorMessage] = useState("");
    const commentRef = useRef()
    const {getUser, getThreadObject} = useContext(MainContext)

    function testRegex(text) {
        let videoUrlRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/i;
        let imgUrlRegex = /http[^\s]+(jpg|jpeg|png|tiff)(&(amp;)?[\w\?=]*)?/i;
        if (videoUrlRegex.test(text)) {
            return text.replace(videoUrlRegex, function (url) {
                return '<iframe id="ytplayer" type="text/html" width="420" height="345" src="' + url + '">' + url + '</iframe>';
            });
        } else if (imgUrlRegex.test(text)) {
            return text.replace(imgUrlRegex, function (url) {
                return '<img width="420" height="345" src="' + url + '"/>'
            });
        } else {
            return text
        }

    }


    function testEmbed(test) {
        let setEmbedVideo = /watch[^\s]v=/i
        if (setEmbedVideo.test(test)) {
            return test.replace(setEmbedVideo, 'embed/')
        }
        return test
    }

    async function submitComment() {

        let commentRegex = await testRegex(commentRef.current.value)
        let embed = await testEmbed(commentRegex)

        const comment = {
            comment: embed,
            date: Date.now(),
            creator: getUser,
            index: index,
            threadId: getThreadObject._id

        };

        try {
            const res = await http.post(comment, "postComment");
            if (res.success) {
                setComment(res.allComments)
                const commentDiv = document.getElementById("hideComment")
                commentDiv.classList.add("hideComment")
            }


            if (res.success) {
                setErrorMessage("");
            } else {
                setErrorMessage(res.message);
            }
        } catch (error) {

        }
    }


    return (
        <div className="mainDiv">
            <div className="d-flex flex-column">
                <div className="d-flex align-items-center justify-content-center">
                    <form>
                    <textarea ref={commentRef} className="form-control inputHeight">
                    </textarea>
                    </form>
                </div>
                <div className="text-center">
                    <button type="button" class="btn btn-dark" onClick={submitComment}>Submit Comment</button>
                </div>
                {errorMessage && (
                    <div className="text-center mt-3">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateNewComment;