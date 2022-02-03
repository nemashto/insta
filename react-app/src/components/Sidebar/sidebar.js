import React, { useContext } from 'react'
import { Suggested } from './suggested'
import { SidebarUser } from './user'
import { UserContext } from '../../context/user'

export const Sidebar = () => {
    const { user } = useContext(UserContext)

    return(
        <div className="p-4">
            <SidebarUser username={user.username} fullname={user.fullname} profileImg={user.profileImage}/>
            <Suggested />
        </div>
    )
}