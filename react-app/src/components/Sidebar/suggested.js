import React, {useEffect} from "react";
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux'
import { getAllSuggestedProfile } from "../../state/profileSlice";
import { SuggestedProfile } from "./suggestedProfile";


export const Suggested = () => {
    const dispatch = useDispatch()
    const profiles = useSelector(state => state.profile.profiles)
    
    useEffect(() => {
        (async()=>{
            await(dispatch(getAllSuggestedProfile()))
        })()
    }, [dispatch])

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile)=>(
                    <SuggestedProfile 
                        key={profile.id} 
                        id={profile.id} 
                        username={profile.username}
                        profileImage={profile.profileImage}
                        isFollower={profile.isFollower}
                    />
                ))}
            </div>
        </div>
    ) : null
}