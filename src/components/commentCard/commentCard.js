import React from 'react';
// ES Modules
import parse from 'html-react-parser';

// CommonJS
// const parse = require('html-react-parser');
const CommentCard = ({item}) => {

    const comment = parse(item.comment)
    console.log(comment, "aa")
    return (
        <div>
            <div className="d-flex">
                <div>
                    <img src={item.creator.profileImage}/>
                </div>
                <div className="d-flex flex-column justify-content-between">
                    <div>
                        <h5>{comment}</h5>
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