import React from "react";

import { ProfileHeader } from "./profileHeader";

export const UserProfile = ({ user, current, postsCount }) => {
    return (
        <>
            <ProfileHeader user={ user } current={ current } postsCount={ postsCount }/>
        </>
    )
}