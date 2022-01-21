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

export const authenticate = () => async (dispatch) => {
  const response = await(new AuthService()).authenticate()

  if (response.ok) {
    const data = await response.json()
    if (data.errors) {
      console.log(data.errors)
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (body) => async (dispatch) => {
  const response = await(new AuthService()).login(body)

  if (response.ok){
    const data = await response.json()
    dispatch(setUser(data))
    return ''
} else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again..']
  }
}

export const logout = () => async (dispatch) => {
  const response = await(new AuthService()).logout()

  if (response.ok) {
    dispatch(removeUser());
  }
}

export const signUp = (body) => async(dispatch) => {
    const response = await(new AuthService()).register(body)
    if (response.ok){
        const data = await response.json()
        dispatch(setUser(data))
        return ''
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
