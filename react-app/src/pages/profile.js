import React, {useState, useEffect}  from "react"
import { useSelector } from 'react-redux'
import { Header } from "../components/header"


const Profile = () => {
    const user = useSelector(state => state.auth.user)

    return user?.username ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                {user.username}
            </div>
        </div>
    ): null
}

export default Profile