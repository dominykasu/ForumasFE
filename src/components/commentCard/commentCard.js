import React from 'react';

const CommentCard = ({item}) => {
    console.log(item)

    return (
        <div>
            <div className="d-flex">
                <div>
                    <img src={item.creator.profileImage}/>
                </div>
                <div className="d-flex flex-column justify-content-between">
                    <div>
                        <h5>{item.comment}</h5>
                    </div>
                    <div>
                        <div>
                            {item.creator.email}
                        </div>
                        <div>
                            {item.date}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CommentCard;