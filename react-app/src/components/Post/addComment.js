import React, {useState} from "react"
import { CommentService } from "../../common/CommentService"
import { useUserContext } from "../../hooks/userContext"

export const AddComment = ({id, comments, setComments, commentInput}) => {
    const [comment, setComment] = useState('')
    const { user } = useUserContext()

    const handleSubmitComment = async(event) => {
        event.preventDefault()
        const base = {
            'body': comment,
            'post_id': id,
            'user_id': user.id,
        }

        const response = await(new CommentService()).create(base)
        console.log(response)
        setComments([...comments, {
             'userName': user.username, 
             'body': comment 
            }])
        setComment('')
    }

    return (
        <div className="border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(event) => 
                    comment.length >= 1 ? handleSubmitComment(event): event.preventDefault()
                }
            >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    )
}