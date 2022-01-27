import React, {useState} from "react"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { followProfileService } from "../../state/profileSlice"


export const SuggestedProfile = ({id, username, profileImage}) => {
    const dispatch = useDispatch()
    const [followed, setFollowed] = useState(false)

    async function handleFollowUser() {
        setFollowed(true)
        await dispatch(followProfileService(id))
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex mr-3"
                    src={profileImage}
                    alt=""
                />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <button
                className="text-xs font-bold text-blue-medium"
                type="button"
                onClick={handleFollowUser}
            >
                Follow
            </button>
        </div>
    ): null
}