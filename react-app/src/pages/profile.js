import React, {useState, useEffect}  from "react"
import { useParams } from 'react-router-dom';
import { Header } from "../components/header"
import { UserProfile } from "../components/Profile/userProfile"
import { ProfilePosts } from "../components/Profile/profilePosts";
import { useUserContext } from "../hooks/userContext";
import { ProfileService } from "../common/ProfileService";
import { PostService } from "../common/PostService";


const Profile = () => {
    const { username } = useParams();
    const { user } = useUserContext()
    const [profileUser, setProfileUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [current, setCurrent] = useState(false)
    
    useEffect(() => {
        const loadUser = async() => {
            const response = await(new ProfileService().get(username))
            setCurrent(false)
            setProfileUser(response)
            if (response != null) loadPosts(response.id)
        }

        const loadPosts = async(id) => {
            const response = await(new PostService().getUserPosts(id))
            if (response.error) {
                console.log(response.error)
            } else {
                setPosts(response)
            }
        }

        if (user && username === user.username) {
            setProfileUser(user)
            setCurrent(true)
            loadPosts(user.id)
        } else {
            loadUser()           
        }


    }, [username, user, setProfileUser, setCurrent])

    return profileUser?.username ? (
        <div className="bg-gray-background">
            <Header />
            {profileUser && 
                <div className="mx-auto max-w-screen-lg">
                    <UserProfile user={profileUser} current={current} postsCount={posts ? posts.length: 0}/>
                    <ProfilePosts posts={posts} />
                </div>
            }
        </div>
    ): null
}

export default Profile