import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PostService } from "../common/PostService"

const initialState = { posts: [] }


export const getUserPostsService = createAsyncThunk(
    "userPosts/",
    async(id) => {
        const response = await(new PostService()).getUserPosts(id)
        const data = await response.json()
        return data
    }
)

export const newPostAction = createAsyncThunk(
    "posts/new",
    async(base) => {
        const response = await(new PostService()).create(base)
        const data = await response.json()
        return data
    }
)

export const likeAction = createAsyncThunk(
    "posts/like",
    async(id) => {
        const response = await(new PostService()).getLike(id)
        const data = await response.json()
        return data
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(newPostAction.fulfilled, (state, action) => {
                if (action.payload.errors) {
                    state.posts = []
                } else {
                    state.posts = action.payload
                }
            })
    }
})

const {reducer} = postSlice
export default reducer
