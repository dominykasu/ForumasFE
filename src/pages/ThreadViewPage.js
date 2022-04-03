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
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';

const ThreadViewPage = () => {

    const {getUser} = useContext(MainContext);
    const {index} = useParams()
const [getAllTopics, setAllTopics] = useState(null)
    const [getFavorites, setFavorites] = useState()
    const [getCheckStorage, setCheckStorage] = useState(false)
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

    // const [getFavorited, setFavorited] = useState(
        // JSON.parse(localStorage.favorites).find((x) => x === topic._id),
    // );

    function addToFavorites(topic){
        let oldLiked = JSON.parse(localStorage.getItem('LikedTopic'));
        if(oldLiked === null){
            oldLiked = []
        }

        if(oldLiked.find((x) => x._id === topic._id)){
            const index = oldLiked.indexOf(oldLiked.find((x) => x._id === topic._id))
            oldLiked.splice(index,1)
        } else {
            oldLiked.push(topic)
        }
        setCheckStorage(!getCheckStorage)
        localStorage.setItem('LikedTopic', JSON.stringify(oldLiked));
// setFavorites(JSON.stringify(oldLiked))

    }
    useEffect(() => {
        setFavorites(JSON.parse(localStorage.LikedTopic))
    },[getCheckStorage])

    // {!getFavorited ? (
    //     <BsSuitHeart
    //         className='product-card-favorite-icon'
    //         onClick={() => setFavoritedStatus(product._id)}
    //         title='Pridėti prie mėgstamiausių'
    //         style={{ color: 'black' }}
    //     />
    // ) : (
    //     <BsSuitHeartFill
    //         className='product-card-favorite-icon'
    //         onClick={() => setFavoritedStatus(product._id)}
    //         title='Pašalinti iš mėgstamiausių'
    //     />
    // )}
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
                    <div className="d-flex justify-content-between" key={i} >
                    <div onClick={() => goToTopic(i)} >
                        <ThreadsCard item={x}/>
                    </div>
                    <div onClick={() => addToFavorites(x)}>
                        {getFavorites.find((y) => y._id === x._id) ?  <BsSuitHeartFill/> : <BsSuitHeart/>}
                    </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ThreadViewPage;