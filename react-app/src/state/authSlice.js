import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from "../common/AuthService"

const initialState = { user: null }


export const authenticateAction = createAsyncThunk(
    "auth/authenticate",
    async() => {
        const response = await(new AuthService()).authenticate()
        const data = await response.json()
        return data
    }
)

export const loginAction = createAsyncThunk(
    "auth/login",
    async(base) => {
        const response = await(new AuthService()).login(base)
        const data = await response.json()
        return data
    }
)

export const logoutAction = createAsyncThunk(
    "auth/logout",
    async() => {
        const response = await(new AuthService()).logout()
        const data = await response.json()
        return data
    }
)

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
            .addCase(authenticateAction.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(authenticateAction.rejected, (state) => {
                state.user = null
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                if (action.payload.errors) {
                    state.user = null
                } else {
                    state.user = action.payload
                }
            })
            .addCase(loginAction.rejected, (state) => {
                state.user = null
            })
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
            .addCase(logoutAction.fulfilled, (state) => {
                state.user = null
            })
    }
})

const {reducer} = authSlice
export default reducer