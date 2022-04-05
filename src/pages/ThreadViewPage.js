import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import './style.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import MainContext from "../context/userContext";
import Pagination from "../components/pagination/pagination";
import AllTopics from "../components/allTopics/allTopics";
import topics from "../assets/topics.json"

const ThreadViewPage = () => {

    const {getUser} = useContext(MainContext);
    const {index} = useParams()
    const [getThreadName, setThreadName] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const asd = topics.findIndex((x, i) => {
            if (i === Number(index)) {
                return setThreadName(x.gameName)
            }
        })
    }, [])

    const [getAllTopics, setAllTopics] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 10

    useEffect(() => {

        setLoading(true)

        async function getTopics() {
            const options = {
                method: "GET",
                headers: {
                    "content-type": "application.json"
                },
                credentials: "include"
            }
            const res = await fetch("http://localhost:4000/getThreads/" + index, options);
            const data = await res.json();

            if (data.success) {
                setAllTopics(data.allTopics);
                setLoading(false)
            }
        }

        getTopics();
    }, [])


    function newTopic() {
        navigate(`/createtopic/${index}`)
    }

    // Get Current Posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = getAllTopics.slice(indexOfFirstPost, indexOfLastPost)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className="mainDiv">
            <div onClick={() => navigate(-1)}>
                <div style={{"margin": "7px 0px 5px 9px"}}>Back</div>

            </div>
            <h5 style={{"margin": "0 0 5px 9px", "color": "#ff4600"}}>{getThreadName}</h5>
            {getUser ? <div style={{"margin": "0 9px 5px 9px"}} className="createNewTopicDiv">
                    <div onClick={newTopic} className="newTopicButtonDiv">New Topic</div>
                </div> :
                <div style={{"margin": "0 9px 5px 9px"}} className="createNewTopicDiv">
                    <div className="newTopicButtonDiv">Must be logged in to create new topic</div>
                </div>
            }
            <AllTopics topics={currentPosts} loading={loading}/>
            {getAllTopics.length > postsPerPage &&
            <Pagination postsPerPage={postsPerPage} totalPosts={getAllTopics.length} paginate={paginate}/>}
        </div>
    );
};

export default ThreadViewPage;