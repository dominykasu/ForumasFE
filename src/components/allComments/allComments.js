import React, {useContext, useEffect, useState} from 'react';
import TopicCard from "../topicCard/topicCard";
import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import MainContext from "../../context/userContext";
import CommentCard from "../commentCard/commentCard";
const AllComments = ({loading, comments}) => {

    const {getUser, setThreadObject, getThreadObject} = useContext(MainContext);
    const navigate = useNavigate()
    const [getFavorites, setFavorites] = useState([])
    const [getCheckStorage, setCheckStorage] = useState(false)





    if(loading){
        return <h2>Loading...</h2>
    }

    return <ul className="list-group mb-4">
        {comments.map((x,i)=>
            <div className="d-flex justify-content-between" key={i} >
                <div >
                    <CommentCard item={x}/>
                </div>

            </div>)}
    </ul>;
};

export default AllComments;