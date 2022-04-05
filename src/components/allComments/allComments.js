import React, {useContext} from 'react';
import MainContext from "../../context/userContext";
import CommentCard from "../commentCard/commentCard";

const AllComments = ({loading, comments}) => {

    const {getThreadObject} = useContext(MainContext);

    if (loading) {
        return <h2>Loading...</h2>
    }

    return <ul className="list-group mb-4">
        <h3 className="threadName">{getThreadObject.topic}</h3>
        {comments.map((x, i) =>
            <div className="d-flex justify-content-between" key={i}>
                <div>
                    <CommentCard item={x}/>
                </div>
            </div>)}
    </ul>;
};

export default AllComments;