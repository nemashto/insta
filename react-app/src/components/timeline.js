import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../state/postSlice'
import { Post } from './Post/post';


export const Timeline = () => {
    const dispatch = useDispatch()

    const posts = useSelector(state => state.post.posts)

    useEffect(() => {
        (async() => {
            await( dispatch(getAllPosts()))
        })()
    }, [dispatch])

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
