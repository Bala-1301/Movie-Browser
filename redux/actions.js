//actions
export const ADD_WATCH_LIST = 'ADD_WATCH_LIST'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_WATCH_LIST = 'REMOVE_WATCH_LIST'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

//action creators

export const addWatchList = newMovie => ({
	type : ADD_WATCH_LIST,
	payload : newMovie
})

export const addFavorite = newMovie => ({
	type : ADD_FAVORITE,
	payload : newMovie
})

export const removeWatchList = movie => ({
	type : REMOVE_WATCH_LIST,
	payload : movie
})

export const removeFavorite = movie => ({
	type : REMOVE_FAVORITE,
	payload : movie
})
