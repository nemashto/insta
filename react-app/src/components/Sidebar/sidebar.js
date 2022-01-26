import React from 'react'
import { useSelector } from 'react-redux'
import { Suggested } from './suggested'
import { SidebarUser } from './user'

export const Sidebar = () => {
    const user = useSelector(state => state.auth.user)

    return(
        <div className="p-4">
            <SidebarUser username={user.username} fullname={user.fullname} profileImg={user.profileImage}/>
            <Suggested />
        </div>
    )
}