 import {createStore, combineReducers} from 'redux'

const rootReducer = combineReducers({})

let enhacer

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhacer)
}

export default configureStore
