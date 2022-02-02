import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { AddComment } from "./addComment";

export const Comments = ({id, comments: allComments, posted, commentImput}) => {
    const [comments, setComments] = useState(allComments)
    console.log(comments)
    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {comments && comments.map((comment) => (
                    <div key={comment.id} className="mb-1">
                        <Link to={`/p/${comment.userName}`} >
                            <span className="mr-1 font-bold">{comment.userName}</span>
                        </Link>
                        <span>{comment.body}</span>
                    </div>
                ))} 
            </div>
            <AddComment id={id} comments={comments} setComments={setComments} commentInput={commentImput} />
        </>
    )
}