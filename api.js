const API_KEY = "938ba536"

export const fetchRandom = async () => {

	let result = []
	
	const a = ["tt8366590","tt1634106","tt4411584","tt10964430","tt7510346",
				"tt1502397","tt9648672","tt3794354", "tt8332922", "tt7713068"]
	
	for(let i = 0; i < 10; i++){
		let f = 1
		const url =  `http://www.omdbapi.com/?apikey=${API_KEY}&i=${a[i]}`
		try {
			const response = await fetch(url)
			const Search = await response.json()
			result.map(item => {
				if(item.imdbID === Search.imdbID)
					f = 0
				
			})
			if(f == 1)
				result = [...result,Search]
		
		}catch(err){
			console.log(err.message)
			return {}
		}
	}
	var ctr = result.length, temp, index;
	while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = result[ctr];
        result[ctr] = result[index];
        result[index] = temp;
	}
	return result
	
} 

export const fetchMovie = async (name) => {
	const url =  `http://www.omdbapi.com/?apikey=${API_KEY}&s=${name}`
	try {
		const response = await fetch(url)	
		const {Search} = await response.json()
		
		return Search
	}catch(err){
		console.log(err.message)
		return {}
	}
} 

export const fetchInfo = async id => {
	
	const url = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
	try{
		const response = await fetch(url)
		const result = await response.json()
		return result
	}catch(err){
		console.log(err.message)
	}
}