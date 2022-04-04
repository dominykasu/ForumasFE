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


    // let re = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/i;
    // let img = /http[^\s]+(jpg|jpeg|png|tiff)(&(amp;)?[\w\?=]*)?/i;
    // if( re.test("com dadadadad") ){
    //     console.log("aaa")
    // } else if (img.test(" dadadadad jpg")){
    //     console.log("bbb")
    // } else {
    //     console.log("ccc")
    // }


//place in dive to show column
  function testRegex(text){
        let videoUrlRegex =/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/i;
        // let setEmbedVideo = /watch[^\s]v=/i
        let imgUrlRegex =/http[^\s]+(jpg|jpeg|png|tiff)(&(amp;)?[\w\?=]*)?/i;
        // if(videoUrlRegex.test(text)){
            // if(embedVideo.test(text)){
            // let test = text.replace(setEmbedVideo, 'embed/')
            // }
            // console.log(test)
            if(videoUrlRegex.test(text)) {
                return text.replace(videoUrlRegex, function(url) {
                    return '<iframe id="ytplayer" type="text/html" width="420" height="345" src="' + url + '">' + url + '</iframe>';
                });
            // }
            // return text.replace(videoUrlRegex, function(url) {
            //     return '<iframe id="ytplayer" type="text/html" width="420" height="345" src="' + url + '">' + url + '</iframe>';
            // });
        } else if(imgUrlRegex.test(text)) {
            return text.replace(imgUrlRegex, function (url) {
                return '<img width="420" height="345" src="' + url + '"/>'
            });
        } else {
                return text
            }

    }
    // function testRegexImage(text){
    //     let imgUrlRegex =/http[^\s]+(jpg|jpeg|png|tiff)(&(amp;)?[\w\?=]*)?/i;
    //     return text.replace(urlRegex, function(url) {
    //         return '<img width="420" height="345" src="' + url + '"/>'
    //     });
    // }

function testEmbed(test){
    let setEmbedVideo = /watch[^\s]v=/i
    console.log(setEmbedVideo.test(test))
    if(setEmbedVideo.test(test)){
      return test.replace(setEmbedVideo, 'embed/')

    }
    // console.log(test)
 return test
}

    async function submitComment(){

        let commentRegex = await testRegex(commentRef.current.value)
        let embed = await testEmbed(commentRegex)

        console.log(embed)

        const comment = {
            comment : embed,
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