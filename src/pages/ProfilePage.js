import React, {useContext, useEffect, useState} from 'react';
import './style.css'
import MainContext from "../context/userContext";
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import {useNavigate} from "react-router-dom";
import TopicCard from "../components/topicCard/topicCard";
import {Button} from "react-bootstrap";
import MyVerticallyCenteredModal from "../components/modal/modal";
import CommentCard from "../components/commentCard/commentCard";
const ProfilePage = () => {

    const navigate = useNavigate()
    const {getUser} = useContext(MainContext);

    const [modalShow, setModalShow] = React.useState(false);
 const [getMyComments, setMyComments] = useState()

    useEffect(() => {
        async function getMyComments() {

            const options = {
                method: "GET",
                headers: {
                    "content-type" : "application.json"
                },
                credentials: "include",

            }

            const res = await fetch(`http://localhost:4000/getMyComments/${getUser.email}`, options);
            const data = await res.json();

            if (data.success) {
                setMyComments(data.myComments);
                // window.scrollTo({top: 0, left: 0, behavior: "instant"});
            }
        }
        getMyComments();
    }, [])






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

            {getMyComments && <h5>My Comments</h5>}
            {getMyComments && getMyComments.map((x,i)=>
                <div className="d-flex justify-content-between" key={i} >
                    {/*<div onClick={() => goToTopic(i)} >*/}
                        <CommentCard item={x}/>
                    {/*</div>*/}
                </div>

            )}
        </div>
    );
};

export default ProfilePage;