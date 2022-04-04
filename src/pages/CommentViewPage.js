import React, {useContext, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import TopicCard from "../components/topicCard/topicCard";
import './style.css'
import {useRef} from "react";
import CreateNewComment from "../components/createNewComment/createNewComment";
import {useState} from "react";
import CommentCard from "../components/commentCard/commentCard";
import MainContext from "../context/userContext";
import AllTopics from "../components/allTopics/allTopics";
import Pagination from "../components/pagination/pagination";
import AllComments from "../components/allComments/allComments";
const CommentViewPage = () => {

    const {getUser, getThreadObject, setThreadObject} = useContext(MainContext);
    const [getComments,setComments] = useState([])
    const {index} = useParams()
    const [loading,setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 10
    console.log(getThreadObject)

    useEffect(() => {
        setLoading(true)
        async function getComments() {



            const options = {
                method: "GET",
                headers: {
                    "content-type" : "application.json"
                },
                credentials: "include",

            }
            const res = await fetch(`http://localhost:4000/getComments/${index}/${getThreadObject._id}`, options);
            const data = await res.json();
            console.log(data)
            if (data.success) {
                setComments(data.allComments);
                setLoading(false)
                // window.scrollTo({top: 0, left: 0, behavior: "instant"});
            }
        }
        getComments();
    }, [])

    function createCommentButton(){
        const commentDiv = document.getElementById("hideComment")
        if(commentDiv.classList.contains("hideComment")){
            commentDiv.classList.remove("hideComment")
        } else {
            commentDiv.classList.add("hideComment")
        }




    }
    // Get Current Comments
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = getComments.slice(indexOfFirstPost, indexOfLastPost)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="mainDiv">
            <div className="d-flex justify-content-between">
                <div>Route</div>
                <div>Search</div>
            </div>
            {/*<h1>{getThreadObject.topic}</h1>*/}
            {getUser ? ""
            :
                <div className="createNewTopicDiv">
                    <div className="newTopicButtonDiv">Must be logged in to comment</div>
                </div>
            }

            <AllComments comments={currentPosts} loading={loading}/>
            <Pagination postsPerPage={postsPerPage} totalPosts={getComments.length} paginate={paginate}/>

            {/*<div>{getComments &&*/}
            {/*    getComments.map((x,index) =>*/}
            {/*        <div key={index}>*/}
            {/*            <CommentCard item={x}/>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
          <div>
              {getUser &&
                  <div>
              <div onClick={createCommentButton}>Comment</div>
                  <div className="hideComment" id="hideComment">
                  <CreateNewComment index={index} setComment={setComments}/>
                  </div>
                  </div>}

          </div>
        </div>
    );
};

export default CommentViewPage;