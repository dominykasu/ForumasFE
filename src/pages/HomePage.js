import React from 'react';
import './style.css'
import topics from "../assets/topics.json"
import TopicsCard from "../components/topicsCard/topicsCard";
import {useNavigate} from "react-router-dom";
const HomePage = () => {

    const navigate = useNavigate()

    function goToThread(index){
        console.log(index)
        navigate(`/thread/${index}`)

    }

    return (
        <div className="mainDiv">
            This is Home Page
            <div>
                {topics.map((x,i) =>
                    <div key={i}   onClick={() => goToThread(i)}>
                        <TopicsCard item={x}/>

                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;