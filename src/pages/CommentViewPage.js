import React, {useContext, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import ThreadsCard from "../components/threadsCard/threadsCard";
import './style.css'
import {useRef} from "react";
import CreateNewComment from "../components/createNewComment/createNewComment";
import {useState} from "react";
import CommentCard from "../components/commentCard/commentCard";
import MainContext from "../context/userContext";

const CommentViewPage = () => {
    const {getUser} = useContext(MainContext);
    const [getComments,setComments] = useState(null)
    const {index} = useParams()

    useEffect(() => {
        async function getComments() {
            const options = {
                method: "GET",
                headers: {
                    "content-type" : "application.json"
                },
                credentials: "include"
            }
            const res = await fetch("http://localhost:4000/getComments/" + index, options);
            const data = await res.json();
            console.log(data)
            if (data.success) {
                setComments(data.allComments);
                // window.scrollTo({top: 0, left: 0, behavior: "instant"});
            }
        }
        getComments();
    }, [])

    function createComment(){
        const commentDiv = document.getElementById("hideComment")
        if(commentDiv.classList.contains("hideComment")){
            commentDiv.classList.remove("hideComment")
        } else {
            commentDiv.classList.add("hideComment")
        }




    }

    return (
        <div className="mainDiv">
            <div className="d-flex justify-content-between">
                <div>Route</div>
                <div>Search</div>
            </div>
            <h1>General Discussion</h1>
            {getUser ? ""
            :
                <div className="createNewTopicDiv">
                    <div className="newTopicButtonDiv">Must be logged in to comment</div>
                </div>
            }

            <div>{getComments &&
                getComments.map((x,index) =>
                    <div key={index}>
                        <CommentCard item={x}/>
                    </div>
                )}
            </div>
          <div>
              {getUser &&
                  <div>
              <div onClick={createComment}>Comment</div>
                  <div className="hideComment" id="hideComment">
                  <CreateNewComment index={index}/>
                  </div>
                  </div>}

          </div>
        </div>
    );
};

export default CommentViewPage;