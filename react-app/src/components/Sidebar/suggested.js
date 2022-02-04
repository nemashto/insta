import React, {useEffect, useState} from "react";
import Skeleton from 'react-loading-skeleton';
import { ProfileService } from "../../common/ProfileService";
import { SuggestedProfile } from "./suggestedProfile";


export const Suggested = () => {
    const [profiles, setProfiles] = useState([])
    
    useEffect(() => {
        const getSuggestedUsers = async() => {
            const response = await(new ProfileService().getAll())
            if (response.errors || response.error) {
                console.log(response)
            } else {
                setProfiles(response.users)
            }
        }
        getSuggestedUsers()
    }, [setProfiles])

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