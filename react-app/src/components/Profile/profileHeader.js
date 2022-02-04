import React, { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import { ProfileService } from "../../common/ProfileService";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";

export const ProfileHeader = ({ user, current, postsCount }) => {
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState()

  const handleFollow = async () => { 
    if (isFollowingProfile) {
      setIsFollowingProfile(false)
    } else setIsFollowingProfile(true)
    
    await(new ProfileService().getFollow(user.id))
  }

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async() => {
      const response = await(new ProfileService().isGetFollowing(user.id))
      setIsFollowingProfile(response.isFollowing)
    }

    const loadFollowing = async() => {
      const response = await(new ProfileService().getFollowing(user.id))
      setFollowing(response.following)
      setFollowers(response.followers)
    }

    loadFollowing()

    if (!current) {
      isLoggedInUserFollowingProfile()
    }
  }, [setIsFollowingProfile, setFollowing, setFollowers, current, user])

console.log(isFollowingProfile)
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
                {current ? (
                  <Skeleton count={1} width={80} height={32} />
                ):(
                  <button
                  className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  type="button"
                  onClick={handleFollow}
                >
                  {isFollowingProfile && isFollowingProfile ? 'Unfollow' : 'Follow'}
                </button>
                )
                }
              </div>
              <div className="container flex mt-4">
                {!following ? (
                  <Skeleton count={1} width={677} height={24} />
                ):(
                  <>
                    <p className="mr-10">
                      <span className="font-bold">{postsCount}</span>  posts
                    </p>
                    <p className="mr-10">
                      <span className="font-bold">{followers}</span> followers
                    </p>
                    <p className="mr-10">
                      <span className="font-bold">{following?.length}</span> following
                    </p>
                  </>
                )}
              </div>
              <div className="container mt-4">
                <p className="font-medium">{!user.fullname ? <Skeleton count={1} height={24} /> : user.fullname}</p>
              </div>
          </div>
      </div>
  )
}