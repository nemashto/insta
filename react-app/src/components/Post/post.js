import React, {useRef} from "react";
import { PostActions } from "./actions";
import { Comments } from "./comments";
import { PostFooter } from "./footer";
import { PostHeader } from "./header";
import { Image } from "./image";

export const Post = ({content}) => {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus()
    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <PostHeader username={content.username} profilImg={content.profileImage} />
            <Image src={content.photoUrl} caption={content.caption} />
            <PostActions id={content.id} isLiked={content.isLiked} likes={content.likes} handleFocus={handleFocus} />
            <PostFooter caption={content.caption} username={content.username} />
            <Comments id={content.id} comments={null} createdAt={content.created_at} commentInput={commentInput}/>
        </div>
    )
}