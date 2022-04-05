import React from 'react';
import './style.css'

const TopicCard = ({item}) => {

    return (
        <div className="d-flex">
            <div>
                <img className="imgClass" src={item.creator.profileImage}/>
            </div>
            <div className="d-flex flex-column justify-content-between  topicTextDiv">
                <div className="text-center">
                    <h5>{item.topic}</h5>
                </div>
                <div className="fontSize">
                    <div className="text-muted">
                        Started by {item.creator.email}
                    </div>
                    <div className="text-muted">
                        {new Date(item.date).toLocaleString('en-US')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicCard;