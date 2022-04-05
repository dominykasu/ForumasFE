import React, {useContext, useEffect, useState} from 'react';
import './style.css'
import MainContext from "../context/userContext";
import {useNavigate} from "react-router-dom";
import TopicCard from "../components/topicCard/topicCard";
import {Button} from "react-bootstrap";
import MyVerticallyCenteredModal from "../components/modal/modal";
import CommentCard from "../components/commentCard/commentCard";

const ProfilePage = () => {

    const navigate = useNavigate()
    const {getUser, setThreadObject} = useContext(MainContext);
    const [modalShow, setModalShow] = React.useState(false);
    const [getMyComments, setMyComments] = useState()
    const [getMyTopics, setMyTopics] = useState()

    useEffect(() => {
        async function getMyComments() {
            const options = {
                method: "GET",
                headers: {
                    "content-type": "application.json"
                },
                credentials: "include",
            }

            const res = await fetch(`http://localhost:4000/getMyComments/${getUser.email}`, options);
            const data = await res.json();

            if (data.success) {
                setMyComments(data.myComments);
            }
        }

        getMyComments();
    }, [])

    useEffect(() => {
        async function getMyTopics() {
            const options = {
                method: "GET",
                headers: {
                    "content-type": "application.json"
                },
                credentials: "include",
            }
            const res = await fetch(`http://localhost:4000/getMyTopics/${getUser.email}`, options);
            const data = await res.json();

            if (data.success) {
                setMyTopics(data.myTopics);
            }
        }

        getMyTopics();
    }, [])

    function goToTopic(index, event) {

        if (getUser.email === event.creator.email) {
            async function setNotification() {
                const options = {
                    method: "GET",
                    headers: {
                        "content-type": "application.json"
                    },
                    credentials: "include",

                }

                const res = await fetch(`http://localhost:4000/setNotification/${event._id}`, options);
                const data = await res.json();

            }

            setNotification()

        }
        setThreadObject(event)
        navigate(`/topic/${event.index}/${event._id}`)
    }

    return (
        <div className="mainDiv">
            <div className="profilePageUserDiv">
                <h5 style={{"margin": "15px 0 0 5px", "color": "#ff4600"}}>Profile Page</h5>
                {getUser && <div>
                    <img className="profilePageUserImgDiv" src={getUser.profileImage}/>
                    <h5>{getUser.email}</h5>
                    <Button type="button" className="btn btn-dark" onClick={() => setModalShow(true)}>
                        Change profile picture
                    </Button>

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>}
            </div>
            {getMyTopics && <h5 style={{"margin": "10px 0 0 8px"}}>My Topics</h5>}
            {getMyTopics && getMyTopics.map((x, i) =>
                <div
                    className={x.notifications ? "d-flex justify-content-between addBorder mainTopicsCardDiv" : "d-flex justify-content-between mainTopicsCardDiv"}
                    key={i}>
                    <div onClick={() => goToTopic(i, x)}>
                        <TopicCard item={x}/>
                    </div>
                </div>
            )}
            {getMyComments && <h5 style={{"margin": "10px 0 0 8px"}}>My Comments</h5>}
            {getMyComments && getMyComments.map((x, i) =>
                <div className="d-flex justify-content-between" key={i}>
                    <CommentCard item={x}/>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;