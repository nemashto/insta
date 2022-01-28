import React from "react";
import Skeleton from "react-loading-skeleton";

export const ProfilePosts = ({ posts }) => {
    return (
        <div className="h-16 border-t border-gray-primary mt-12 pt-4">
            <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
                { !posts 
                    ? new Array(12).fill(0).map((_, i) => <Skeleton key={i} width={320} height={400} /> )
                    : posts.length > 0
                    ? posts.map((post) => (
                        <div key={post.id} className="relative group">
                            <img src={post.photoUrl} alt={post.caption} />

                            <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                                <p className="flex items-center text-white font-bold">

                                </p>
                            </div>
                        </div>
                    )): null
                }
            </div>
            {!posts || (posts.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}
        </div>
    )
}