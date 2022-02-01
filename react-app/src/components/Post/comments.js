import React, { useState } from "react";
import { AddComment } from "./addComment";

export const Comments = ({id, comments: allComments, posted, commentImput}) => {
    const [comments, setComments] = useState(allComments)

    return (
        <>
            <div className="p-4 pt-1 pb-4">
                
            </div>
            <AddComment id={id} comments={comments} setComments={setComments} commentInput={commentImput} />
        </>
    )
}