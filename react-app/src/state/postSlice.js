import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PostService } from "../common/PostService"

const initialState = { posts: [] }

export const newPostAction = createAsyncThunk(
    "post/new",
    async(base) => {
        const response = await(new PostService()).create(base)
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
