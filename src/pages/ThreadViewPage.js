import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import './style.css'
import ThreadsCard from "../components/threadsCard/threadsCard";
import {Link} from "react-router-dom";
import {useState} from "react";
import TopicsCard from "../components/topicsCard/topicsCard";
import {useNavigate} from "react-router-dom";
import userContext from "../context/userContext";
import MainContext from "../context/userContext";
const ThreadViewPage = () => {

    const {getUser} = useContext(MainContext);
    const {index} = useParams()
const [getAllTopics, setAllTopics] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function getTopics() {
            const options = {
                method: "GET",
                headers: {
                    "content-type" : "application.json"
                },
                credentials: "include"
            }
            const res = await fetch("http://localhost:4000/getThreads/" + index, options);
            const data = await res.json();
            console.log(data)
            if (data.success) {
                setAllTopics(data.allTopics);
                // window.scrollTo({top: 0, left: 0, behavior: "instant"});
            }
        }
        getTopics();
    }, [])

    function goToTopic(index){
        console.log(index)
        navigate(`/topic/${index}`)

    }
    function newTopic(){
        navigate(`/createtopic/${index}`)
    }

    return (
        <div className="mainDiv">
            <div className="d-flex justify-content-between">
                <div>Route</div>
                <div>Search</div>
            </div>
            <h1>General Discussion</h1>
            {getUser ? <div className="createNewTopicDiv">
                <div onClick={newTopic} className="newTopicButtonDiv">New Topic</div>
            </div> :
                <div className="createNewTopicDiv">
                    <div className="newTopicButtonDiv">Must be logged in to create new topic</div>
                </div>
            }

            <div>
                {getAllTopics && getAllTopics.map((x,i)=>
                    <div key={i} onClick={() => goToTopic(i)}>
                        <ThreadsCard item={x}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThreadViewPage;