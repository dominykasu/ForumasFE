import React, {useEffect, useState} from 'react';
import TopicCard from "../topicCard/topicCard";
import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs";

const LikedTopics = () => {


    const [getFavorites, setFavorites] = useState([]);
    const [getCheckStorage, setCheckStorage] = useState(false)


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

    return (
        <div className="mainDiv">
            <h5>Favorites</h5>

            {getFavorites && getFavorites.map((x,i)=>
                <div className="d-flex justify-content-between" key={i} >

                    <div>
                        <TopicCard item={x}/>
                    </div>
                    <div onClick={() => addToFavorites(x)}>
                        {getFavorites.find((y) => y._id === x._id) ?  <BsSuitHeartFill/> : <BsSuitHeart/>}
                    </div>
                </div>

            )}
        </div>
    );
};

export default LikedTopics;