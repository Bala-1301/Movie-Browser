import React from 'react'
import {Text, View, StyleSheet, Image, ScrollView, Button} from 'react-native'
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
 
import {fetchInfo} from '../api'
import { addWatchList, addFavorite, removeWatchList, removeFavorite } from '../redux/actions'



const styles = StyleSheet.create({
	container : {
		flex : 1,
		
	},	
	image :{
		borderRadius : 10,
		width : "100%",
		height : 430,
		alignItems : 'center',
		justifyContent : 'center',
	},
	imgContainer:{
		margin : 5,
		alignItems : 'center',
		justifyContent : 'center',
	},
	title:{
		fontSize : 30,
		fontWeight : "bold",
		
	},
	titleContainer :{
		padding : 10,
		alignItems : 'center',
		justifyContent: 'center',
	},
	text : {
		fontSize : 16, 
		padding : 7,
		flex : 1,
		flexWrap : 'wrap'

	},
	textHeader : {
		fontWeight : 'bold',
		fontSize: 18,
		padding : 5,
	},
	b : {
		flexDirection : 'row',
		padding : 10,
	},
	b1: {
		flex : 1,
		alignItems : 'center',
	},
	b2 :{
		flex : 1,
		alignItems : 'center',
	},
	loading : {
		flex : 1,
		alignItems : "center",
		justifyContent : "center",
	},
	loadingText : {
		fontSize : 20,
	}

	
})
class DetailsScreen extends React.Component {
	state = {
		movieInfo : null,
		
	}

	componentDidMount(){
		let id = this.props.route.params.id
		let flag = 1
		this.props.watchList.map(item => {
			if(item.imdbID === id){
				this.setState({movieInfo : item})
				flag = 0
				return
			}
		})
		if (flag === 1){
			this.props.favorite.map(item => {
				if(item.imdbID === id){
					this.setState({movieInfo : item})
					flag = 0
					return
				}
			})
		}
		if(flag === 1){
			this.movieDetails(id)
		}
	}
	
	movieDetails = async (id) =>{
		const result = await fetchInfo(id)
		result.watchId = true
		result.favId = true
		this.setState({movieInfo : result})
	}

	handleWatch = () => {
		{this.state.movieInfo.watchId ? 
			this.props.addWatchList(this.state.movieInfo): 
			this.props.removeWatchList(this.state.movieInfo)
		}
	}

	handleFavorite = () => {
		{this.state.movieInfo.favId ? 
			this.props.addFavorite(this.state.movieInfo): 
			this.props.removeFavorite(this.state.movieInfo)
		}
	}
	
	render(){
		return(
			
			<ScrollView style= {styles.container}>
			<View style ={styles.imgContainer}>
				{this.state.movieInfo && this.state.movieInfo.Poster ?
				<Image 
					resizeMode = "contain"
					style = {styles.image}
					source = {{uri : this.state.movieInfo.Poster}}
				/> : null}
			</View>

			{this.state.movieInfo ?
				<View >
					<View style = {styles.titleContainer}>
						<Text style = {styles.title}>{this.state.movieInfo.Title}</Text>
					</View>
					<View style = {styles.b}>
						<View style = {styles.b1}>
							<Icon  
								name = 'queue'
								raised = {true}
								reverse ={true}
								color = {this.state.movieInfo.watchId?"black" : "skyblue"}
								size = {30}
								
								onPress = {this.handleWatch}	
							 />
						</View>
						<View style = {styles.b2}>
							<Icon
								raised = {true}
								reverse ={true}
								color = {this.state.movieInfo.favId ? "black" : "red"} 
								name = {this.state.movieInfo.favId ? "favorite-border" : "favorite"}
								size = {30}
								onPress = {this.handleFavorite}	
							/>
						</View>
					</View> 
					<View style = {{flexDirection :'row'}}>
						<Text style = {styles.textHeader}>Plot :</Text>
						<Text style = {styles.text}>{this.state.movieInfo.Plot}</Text>
					</View>
					<View style = {{flexDirection :'row'}}>
						<Text style = {styles.textHeader}>Director :</Text>
						<Text style = {styles.text}>{this.state.movieInfo.Director}</Text>
					</View>
					<View style = {{flexDirection :'row'}}>
						<Text style = {styles.textHeader}>Genre :</Text>
						<Text style = {styles.text}>{this.state.movieInfo.Genre}</Text>
					</View>
					<View style = {{flexDirection :'row'}}>
						<Text style = {styles.textHeader}>Language :</Text>
						<Text style = {styles.text}>{this.state.movieInfo.Language}</Text>
					</View>
					<View style = {{flexDirection :'row'}}>
						<Text style = {styles.textHeader}>Actors :</Text>
						<Text style = {styles.text}>{this.state.movieInfo.Actors}</Text>
					</View>
					<View style = {{flexDirection :'row'}}>
						<Text style = {styles.textHeader}>Released :</Text>
						<Text style = {styles.text}>{this.state.movieInfo.Released}</Text>
					</View>
					<View style = {{flexDirection :'row'}}>
						<View>
							<Text style = {styles.textHeader}>Ratings :</Text>
						</View>
						<View>
							
							{this.state.movieInfo.Ratings.map(item =>
								<Text style = {styles.text}>{item.Source} : {item.Value}</Text>)}
						</View>
					</View>
					
					<View style = {{flexDirection :'row'}}>
						<Text style = {styles.textHeader}>Runtime :</Text>
						<Text style = {styles.text}>{this.state.movieInfo.Runtime}</Text>
					</View>
					<View style = {{flexDirection :'row'}}>
						<Text style = {styles.textHeader}>Imdb Rating :</Text>
						<Text style = {styles.text}>{this.state.movieInfo.imdbRating}</Text>
					</View>
					<View style = {{flexDirection :'row'}}>
						<Text style = {styles.textHeader}>Awards :</Text>
						<Text style = {styles.text}>{this.state.movieInfo.Awards}</Text>
					</View>	
				</View>
			: <View style = {styles.loading}><Icon  type= 'evilicon' name = 'spinner' size ={50}/></View>}
			</ScrollView>
		
		)
	}
}

const mapDispatchToProps =  dispatch => {
	return{
		addWatchList : newMovie => {
			dispatch(addWatchList(newMovie))
		},
		addFavorite : newMovie => {
			dispatch(addFavorite(newMovie))
		},
		removeWatchList : movie => {
			dispatch(removeWatchList(movie))
		},
		removeFavorite : movie => {
			dispatch(removeFavorite(movie))
		}
	}
}
const mapStateToProps = state => {
	return{
		watchList : state.watchList,
		favorite : state.favorite
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailsScreen)