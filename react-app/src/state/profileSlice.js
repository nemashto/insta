import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProfileService } from '../common/ProfileService'

const initialState = { 
    profiles: [], 
    profile: {}
}

export const getProfileService = createAsyncThunk(
    "profile/",
    async(username) => {
        const response = await(new ProfileService()).get(username)
        const data = await response.json()
        return data
    }
)

export const getFollowingService = createAsyncThunk(
    "following/",
    async(id) => {
        const response = await(new ProfileService()).getFollowing(id)
        const data = await response.json()
        return data
    }
)

export const followProfileService = createAsyncThunk(
    "follow/",
    async(id) => {
        const response = await(new ProfileService()).getFollow(id)
        const data = await response.json()
        return data
    }
)

export const isFollowingService = createAsyncThunk(
    "isefollow/",
    async(id) => {
        const response = await(new ProfileService()).isGetFollowing(id)
        const data = await response.json()
        return data
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(followProfileService.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    state.user = action.payload
                } 
            })
    }
})

const {reducer} = profileSlice
export default reducer