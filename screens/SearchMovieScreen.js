import React from 'react'
import {View, StyleSheet, FlatList, TouchableOpacity, Text, Image, ActivityIndicator} from 'react-native'
import { SearchBar } from 'react-native-elements'

import {fetchMovie, fetchRandom} from '../api'

const styles = StyleSheet.create({
	
	container : {
		flex : 1,
	},
	in :{
		width: 370,
		height : 40,
		backgroundColor : 'white',
		borderRadius : 10,

	},
	listItem:{
		flex: 1,
		margin : 4,
		borderRadius : 10,
		padding : 5,
		backgroundColor: '#fff',
	},
	listText1:{
		fontSize : 18,
	},
	listText2: {
		fontSize : 14,
	},
	list : {
		marginBottom : "8.5%",
		borderColor : 'grey',
		margin : 5,
	},
	imgContainer : {
		paddingLeft: 10,
		paddingRight : 10,
		alignItems : "center"
	},
	img :{
		width : 180,
		height : 250,
		borderRadius : 10,
	},
	
	
	indicator : {
		flex : 1,
		alignItems : 'center',
		justifyContent : "center"
	}

})
let id = 0
export default class SearchMovieScreen extends React.Component {
	state = {
		inputName : '',
		movies : null,
		randomMovies : null,
	}
	componentDidMount(){
		if(this.state.movies === null){
			this.getMovie()
		}
	}
	componentDidUpdate(prevProps,prevStates){
		if(this.state.inputName != prevStates.inputName){
			this.searchMovie(this.state.inputName)
		}
		
	}

	getMovie = async () => {
		try{
			const results = await fetchRandom()
			this.setState({randomMovies : results})
			

		}catch(err){
			console.log(err.message)
		}
	}

	searchMovie = async text => {
		try{	
			const results = await fetchMovie(text)
			
			this.setState({movies : results})
		}catch(err){
			console.log(err.message)
			
		}
	}
	listMovies = (item) => {
		
		return(
			<TouchableOpacity
				style = {styles.listItem} 
				onPress = {()=> this.props.navigation.navigate("Details", {
					id : item.imdbID,
					title : item.Title,
					type : item.Type
				})}
			>
			
				<View style = {styles.imgContainer}>
					<Image
						resizeMode='contain'
						style ={styles.img}
						source = {{ uri : item.Poster}}/>
				</View>
				<View>
					<Text style={styles.listText1}>{item.Title}</Text>
					<Text style = {styles.listText2}>{item.Year}  {item.Type}</Text>
				</View>
			
			</TouchableOpacity>
		)
	}

	render(){
		return(
			<View style = {styles.container}>
			<View style = {{alignItems : "center", marginTop : 10,}}>
				<SearchBar
					platform = 'android'
					containerStyle = {{borderRadius : 20, marginTop : 5}}
					inputContainerStyle = {styles.in}
					placeholder = "Search movie..."
					onChangeText = {(text) => this.setState({inputName : text})}
					value = {this.state.inputName}
					
				/>
			</View>
			{(this.state.randomMovies && this.state.inputName=="") || this.state.movies ?
			
			<View style = {styles.list}>
				
				<FlatList
					numColumns = {2}
					keyboardShouldPersistTaps = 'always'
					data = {this.state.movies ? this.state.movies : this.state.randomMovies}
					renderItem = {({item}) => this.listMovies(item)}
					keyExtractor = {item => item.imdbID + ++id} 

				/>	
			</View>
			: <View style={styles.indicator}><ActivityIndicator size='large'/></View>}
			</View>
		)
	}
}