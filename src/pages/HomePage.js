import React from 'react';
import './style.css'
import topics from "../assets/topics.json"
import TopicsCard from "../components/topicsCard/topicsCard";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate()

    function goToThread(index) {
        navigate(`/thread/${index}`)
    }

    return (
        <div className="mainDiv">
            <h5 style={{"margin": "15px 0 0 10px", "color": "#ff4600"}}>FPS Forum @ http://localhost:3000/</h5>
            <div>
                {topics.map((x, i) =>
                    <div key={i} onClick={() => goToThread(i)}>
                        <TopicsCard item={x}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;