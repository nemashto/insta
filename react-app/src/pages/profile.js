import React, {useState, useEffect}  from "react"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Header } from "../components/header"
import { UserProfile } from "../components/Profile/userProfile"
import { getProfileService } from "../state/profileSlice";
import { getUserPostsService } from "../state/postSlice";
import { ProfilePosts } from "../components/Profile/profilePosts";


const Profile = () => {
    const dispatch = useDispatch()
    const { username } = useParams();
    const currentUser = useSelector(state => state.auth.user)
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [current, setCurrent] = useState(false)
    
    useEffect(() => {
        const loadUser = async() => {
            const loadedUser = await(dispatch(getProfileService(username)))
            setCurrent(false)
            const data = await loadedUser.payload
            setUser(data)
            loadPosts(data.id)
        }

        const loadPosts = async(id) => {
            const loadedPosts = await(dispatch(getUserPostsService(id)))
            setPosts(loadedPosts.payload)
        }

        if (username === currentUser.username) {
            setUser(currentUser)
            setCurrent(true)
            loadPosts(currentUser.id)
        } else {
            loadUser()           
        }


    }, [setUser, username, currentUser, dispatch])


    return user?.username ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} current={current} postsCount={posts.length}/>
                <ProfilePosts posts={posts} />
            </div>
        </div>
    ): null
}

export default Profile