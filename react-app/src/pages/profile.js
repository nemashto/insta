import React, {useState, useEffect, useContext}  from "react"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Header } from "../components/header"
import { UserProfile } from "../components/Profile/userProfile"
import { getProfileService } from "../state/profileSlice";
import { getUserPostsService } from "../state/postSlice";
import { ProfilePosts } from "../components/Profile/profilePosts";
import { UserContext } from "../context/user";


const Profile = () => {
    const dispatch = useDispatch()
    const { username } = useParams();
    const { user } = useContext(UserContext)
    const [profileUser, setProfileUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [current, setCurrent] = useState(false)
    
    useEffect(() => {
        const loadUser = async() => {
            const loadedUser = await(dispatch(getProfileService(username)))
            setCurrent(false)
            const data = await loadedUser.payload
            setProfileUser(data)
            loadPosts(data.id)
        }

        const loadPosts = async(id) => {
            const loadedPosts = await(dispatch(getUserPostsService(id)))
            setPosts(loadedPosts.payload)
        }

        if (user && username === user.username) {
            setProfileUser(user)
            setCurrent(true)
            loadPosts(user.id)
        } else {
            loadUser()           
        }


    }, [setProfileUser, username, user, dispatch])


    return profileUser?.username ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={profileUser} current={current} postsCount={posts.length}/>
                <ProfilePosts posts={posts} />
            </div>
        </div>
    ): null
}

export default Profile