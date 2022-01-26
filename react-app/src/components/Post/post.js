import React from "react";
import { PostFooter } from "./footer";
import { PostHeader } from "./header";
import { Image } from "./image";

export const Post = ({content}) => {

    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <PostHeader username={content.username} profilImg={content.profileImage} />
            <Image src={content.photoUrl} caption={content.caption} />
            <PostFooter caption={content.caption} username={content.username} />
        </div>
    )
}