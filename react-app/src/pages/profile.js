import React, {useState, useEffect}  from "react"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Header } from "../components/header"
import { UserProfile } from "../components/Profile/userProfile"
import { getProfileService } from "../state/profileSlice";


const Profile = () => {
    const dispatch = useDispatch()
    const { username } = useParams();
    const currentUser = useSelector(state => state.auth.user)
    const [user, setUser] = useState(null)
    const [current, setCurrent] = useState(false)
    
    useEffect(() => {
        if (username === currentUser.username) {
            setUser(currentUser)
            setCurrent(true)
        } else {
            (async() => {
                const loadedUser = await(dispatch(getProfileService(username)))
                setUser(loadedUser.payload)
                setCurrent(false)
            })()            
        }
    }, [setUser, username, currentUser, dispatch])


    return user?.username ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} current={current} />
            </div>
        </div>
    ): null
}

export default Profile