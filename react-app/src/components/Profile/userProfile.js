import React from "react";

import { ProfileHeader } from "./profileHeader";

export const UserProfile = ({ user }) => {
    return (
        <>
            <ProfileHeader user={ user } />
        </>
    )
}