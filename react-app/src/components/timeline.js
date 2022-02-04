import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { PostService } from '../common/PostService';
import { Post } from './Post/post';


export const Timeline = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async() => {
            const response = await(new PostService().getAll())
            if (response.errors || response.error) {
                console.log(response)
            } else {
                setPosts(response)
            }
        }
        getPosts()
    }, [setPosts])

    return (
        <div className="container col-span-2">
            {posts===undefined ?(
                <Skeleton count={2} width={640} height={500} className="mb-5" />
            ): posts.length===0 ?(
                <p className="flex justify-center font-bold">Follow other people to see Photos</p>
            ): posts? (
                posts.map((content) => <Post key={content.id} content={content} />)
            ): null
            }
        </div>
    )
}
