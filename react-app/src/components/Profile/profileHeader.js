import React, { useEffect } from "react"
import Skeleton from 'react-loading-skeleton'
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";

export const ProfileHeader = ({ user }) => {

    useEffect(() => {
      
    })

    return(
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center items-center">
                { user.username ? (
                    <img
                    className="rounded-full h-40 w-40 flex"
                    alt={`${user.fullname}`}
                    src={user.profileImage}
                    onError={(e) => {
                      e.target.src = DEFAULT_IMAGE_PATH;
                    }}
                  />
                ):(
                    <Skeleton circle height={150} width={150} count={1} />
                  )
                }
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                <p className="text-2xl mr-4">{user.username}</p>
                </div>
            </div>
        </div>
    )
}