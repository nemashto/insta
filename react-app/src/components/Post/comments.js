import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { AddComment } from "./addComment";

export const Comments = ({id, comments: allComments, posted, commentImput}) => {
    const [comments, setComments] = useState(allComments)
    const [commentsSlice, setCommentsSlice] = useState(2)

    const showNextComments = () => {
        setCommentsSlice(commentsSlice + 3)
    }

    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {comments && comments.slice(0, commentsSlice).map((comment) => (
                    <div key={comment.id} className="mb-1">
                        <Link to={`/p/${comment.userName}`} >
                            <span className="mr-1 font-bold">{comment.userName}</span>
                        </Link>
                        <span>{comment.body}</span>
                    </div>
                ))}
                { comments.length >= 3 && commentsSlice < comments.length && (
                    <button
                    className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
                    type="button"
                    onClick={showNextComments}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        showNextComments();
                      }
                    }}
                  >
                    View more comments
                  </button>
                )}
                { posted && (<p className="text-gray-base uppercase text-xs mt-2">
                    {formatDistance(posted, new Date())} ago
                </p>)}
            </div>
            <AddComment id={id} comments={comments} setComments={setComments} commentInput={commentImput} />
        </>
    )
}