import React from 'react';
import parse from 'html-react-parser';
import './style.css'

const CommentCard = ({item}) => {

    const comment = parse(item.comment)

    return (
        <div className="userCommentInfoDiv">
            <div className="d-flex">
                <div className="userInfoDiv">
                    <div className="imgClassCommentMargin">
                        <img className="imgClass imgClassCommentMargin" src={item.creator.profileImage}/>
                    </div>
                    <div className="fontSize text-center">
                        <div className="text-muted">
                            {item.creator.email}
                        </div>
                        <div className="text-muted">
                            {new Date(item.date).toLocaleString('en-US')}
                        </div>
                    </div>
                </div>
                <p className="commentCardP" style={{"fontSize": "14px", "margin": "5px 0 5px 0"}}>{comment}</p>
            </div>
        </div>
    );
};

export default CommentCard;

