import React from 'react'
import { Suggested } from './suggested'
import { SidebarUser } from './user'
import { useUserContext } from '../../hooks/userContext'

export const Sidebar = () => {
    const { user } = useUserContext()

    return(
        user && (<div className="p-4">
            <SidebarUser username={user.username} fullname={user.fullname} profileImg={user.profileImage}/>
            <Suggested />
        </div>)
    )
}