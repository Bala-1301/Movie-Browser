import {combineReducers} from 'redux'

import { ADD_FAVORITE, ADD_WATCH_LIST, REMOVE_WATCH_LIST, REMOVE_FAVORITE } from './actions'

const watchListReducer = (state = [], action) => {
	switch(action.type){
		case ADD_WATCH_LIST:
			let flag = 1
			state.map(item => {
				if(action.payload.imdbID === item.imdbID){
					alert("Movie already exist in your watch list!")
					 flag = 0
					 return
				}
			})
			if(flag === 1){
				action.payload.watchId = false
				return [...state,action.payload]
			}
		case REMOVE_WATCH_LIST:
			action.payload.watchId = true
			return state.filter(item => item.imdbID !== action.payload.imdbID)
		default : 
			return state
	}
}

const favoriteReducer = (state = [], action) => {
	switch(action.type){
		case ADD_FAVORITE:
			let flag = 1
			state.map(item => {
				if(action.payload === item){
					alert("Movie already exist in your watch list!")
					flag = 0
					return
				}
			})
			if(flag === 1){
				action.payload.favId = false
				return [...state, action.payload]
			}
		case REMOVE_FAVORITE:
			action.payload.favId = true
			return state.filter(item => item.imdbID !== action.payload.imdbID)
		default : 
			return state
	}
}

const reducer = combineReducers({
	watchList : watchListReducer,
	favorite : favoriteReducer,
})

export default reducer