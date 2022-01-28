import React from "react";

import { ProfileHeader } from "./profileHeader";

export const UserProfile = ({ user, current }) => {
    return (
        <>
            <ProfileHeader user={ user } current={ current } />
        </>
    )
}