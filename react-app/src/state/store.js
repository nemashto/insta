import { configureStore} from '@reduxjs/toolkit'

import authReducer from './authSlice'
import postReducer from './postSlice'
import profileReducer from './profileSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer, 
    profile: profileReducer,
  }
})