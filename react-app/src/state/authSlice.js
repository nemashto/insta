import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from "../common/AuthService"

const initialState = { user: null }

export const signUpAction = createAsyncThunk(
    "auth/signup",
    async(base) => {
        const response = await(new AuthService()).register(base)
        const data = await response.json()
        return data
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUpAction.fulfilled, (state, action) => {
                if (action.payload.errors) {
                    state.user = null
                } else {
                    state.user = action.payload
                }
            })
            .addCase(signUpAction.rejected, (state) => {
                state.user = null
            })
    }
})

const {reducer} = authSlice
export default reducer