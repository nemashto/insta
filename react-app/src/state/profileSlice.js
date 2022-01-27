import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProfileService } from '../common/ProfileService'

const initialState = { profiles: [] }

export const getAllSuggestedProfile = createAsyncThunk(
    "suggested/",
    async() => {
        const response = await(new ProfileService()).getAll()
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

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllSuggestedProfile.fulfilled, (state, action) => {
                if (action.payload.errors) {
                    state.profiles = []
                } else {
                    state.profiles = action.payload.users
                }
            })
            .addCase(followProfileService.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    state.user = action.payload
                } 
            })
    }
})

const {reducer} = profileSlice
export default reducer