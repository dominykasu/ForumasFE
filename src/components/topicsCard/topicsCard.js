import React from 'react';
import './style.css'

const TopicsCard = ({item}) => {

    return (
        <div className="mainTopicsDiv">
            <div className="singleTopicDiv">
                {item.gameName}
            </div>
        </div>
    );
};

export default TopicsCard;