import React, {useState, useEffect}  from "react"
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Header } from "../components/header"
import { UserProfile } from "../components/Profile/userProfile"


const Profile = () => {
    const { username } = useParams();
    const currentUser = useSelector(state => state.auth.user)
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        if (username === currentUser.username) {
            setUser(currentUser)
        }
    }, [setUser, username, currentUser])


    return user?.username ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ): null
}

export default Profile