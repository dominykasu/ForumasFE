import React from 'react';

const ThreadsCard = ({item}) => {
    return (
        <div>
            <div className="d-flex flex-column">
                <div>
                    {item.topic}
                </div>
                <div className="d-flex">
                    <div>
                        {item.creator}
                    </div>
                    <div>
                        {item.date}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ThreadsCard;