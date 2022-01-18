import { AuthService } from "../common/AuthService";

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null };

export const signUp = (body) => async(dispatch) => {
    const response = await(new AuthService).register(body)
    if (response.status === 200) {
        dispatch(setUser("test"))
        return 200
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again..']
      }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
          return { user: action.payload }
        case REMOVE_USER:
          return { user: null }
        default:
          return state;
      }
}
