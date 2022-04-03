import React, {useContext, useEffect, useState} from 'react';
import './style.css'
import MainContext from "../context/userContext";
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import {useNavigate} from "react-router-dom";
import ThreadsCard from "../components/threadsCard/threadsCard";
import {Button} from "react-bootstrap";
import MyVerticallyCenteredModal from "../components/modal/modal";
const ProfilePage = () => {

    const navigate = useNavigate()
    const {getUser} = useContext(MainContext);
    const [getFavorites, setFavorites] = useState()
    const [getCheckStorage, setCheckStorage] = useState(false)
    const [modalShow, setModalShow] = React.useState(false);

    function goToTopic(index){
        console.log(index)
        navigate(`/topic/${index}`)

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
        setFavorites(JSON.parse(localStorage.LikedTopic))
    },[getCheckStorage])

    return (
        <div className="mainDiv">
            <h3>Profile Page</h3>

            {getUser && <div>
               <img src={getUser.profileImage}/>
                <h5>{getUser.email}</h5>
                <Button variant="outline-secondary" size="sm" className="changePictureButton" onClick={() => setModalShow(true)}>
                    Change profile picture
                </Button>

                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>}
            {getFavorites && <h5>Liked Topics</h5>}
            {getFavorites && getFavorites.map((x,i)=>
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
    );
};

export default ProfilePage;