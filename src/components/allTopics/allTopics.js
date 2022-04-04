import React, {useContext, useEffect, useState} from 'react';
import TopicCard from "../topicCard/topicCard";
import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import MainContext from "../../context/userContext";
const AllTopics = ({loading, topics}) => {

    const {getUser, setThreadObject, getThreadObject} = useContext(MainContext);
    const navigate = useNavigate()
    const [getFavorites, setFavorites] = useState([])
    const [getCheckStorage, setCheckStorage] = useState(false)


    function goToTopic(index, event){

        navigate(`/topic/${index}`)
        setThreadObject(event)
        // console.log(event)
        // console.log(index)

    }

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
    }

    useEffect(() => {
        if (localStorage.getItem('LikedTopic') != null){
            setFavorites(JSON.parse(localStorage.LikedTopic))
        }
    },[getCheckStorage])

    if(loading){
        return <h2>Loading...</h2>
    }

    return <ul className="list-group mb-4">
        {topics.map((x,i)=>
            <div className="d-flex justify-content-between" key={i} >
                <div onClick={() => goToTopic(i, x)} >
                    <TopicCard item={x}/>
                </div>
                <div onClick={() => addToFavorites(x)}>
                    {getFavorites.find((y) => y._id === x._id) ?  <BsSuitHeartFill/> : <BsSuitHeart/>}
                </div>
            </div>)}
    </ul>;
};

export default AllTopics;