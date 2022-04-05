import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import './style.css'
import CreateNewComment from "../components/createNewComment/createNewComment";
import {useState} from "react";
import MainContext from "../context/userContext";
import Pagination from "../components/pagination/pagination";
import AllComments from "../components/allComments/allComments";
import {useNavigate} from "react-router-dom";

const CommentViewPage = () => {

    const {getUser, getThreadObject} = useContext(MainContext);
    const [getComments, setComments] = useState([])
    const {index} = useParams()
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 10
    const navigate = useNavigate()

    useEffect(() => {

        setLoading(true)

        async function getComments() {
            const options = {
                method: "GET",
                headers: {
                    "content-type": "application.json"
                },
                credentials: "include",
            }
            const res = await fetch(`http://localhost:4000/getComments/${index}/${getThreadObject._id}`, options);
            const data = await res.json();

            if (data.success) {
                setComments(data.allComments);
                setLoading(false)
            }
        }

        getComments();
    }, [])

    function createCommentButton() {
        const commentDiv = document.getElementById("hideComment")
        if (commentDiv.classList.contains("hideComment")) {
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
            <div onClick={() => navigate(-1)}>
                <div style={{"margin": "7px 0px 5px 9px"}}>Back</div>
            </div>

            {getUser ? ""
                :
                <div style={{"margin": "0 9px 5px 9px"}} className="createNewTopicDiv">
                    <div className="newTopicButtonDiv">Must be logged in to comment</div>
                </div>
            }

            <AllComments comments={currentPosts} loading={loading}/>
            {getComments.length > postsPerPage &&
            <Pagination postsPerPage={postsPerPage} totalPosts={getComments.length} paginate={paginate}/>}

            <div>
                {getUser &&
                <div className="text-center commentButtonMargin">
                    <button type="button" class="btn btn-dark" onClick={createCommentButton}>Post Comment</button>
                    <div className="hideComment" id="hideComment">
                        <CreateNewComment index={index} setComment={setComments}/>
                    </div>
                </div>}

            </div>
        </div>
    );
};

export default CommentViewPage;