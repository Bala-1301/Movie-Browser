import React from 'react'
import {FlatList, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'

import {removeFavorite} from '../redux/actions'
 
const styles = StyleSheet.create({
	container : {
		flex : 1,
		alignItems : 'center',
		justifyContent : 'center',
		marginTop : "75%",
	},
	text : {
		fontSize : 25,
	},
	
	listText1:{
		fontSize : 18,
	},
	listText2: {
		fontSize : 14,
	},
	listView : {
		flex : 3,
	},
	imgContainer : {
		padding : 5,
	},
	img :{
		width : 180,
		height : 250,
		borderRadius : 10,
	},
	listItem:{
		flex : 1,
		alignItems : 'center',
		margin : 4,
		borderRadius : 10,
		padding : 5,
		backgroundColor: '#fff',
		
	},
	icon :{
		flex : 1,
		alignContent :   "flex-end",
		justifyContent : "center"
		
	},
	a1 : {
		flexDirection : 'row',
	}
})


class FavoritesScreen extends React.Component {
	
	dispList = (item) => {
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
				<View style = {styles.a1}>
				<View style = {styles.listView}>
					<Text style={styles.listText1}>{item.Title}</Text>
					<Text style = {styles.listText2}>{item.Year}  {item.Type}</Text>
				</View>
				<View style = {styles.icon}>
					<Icon 
						name = 'remove-circle-outline' 
						color = 'crimson'
						size = {35} 
						onPress={() => this.props.removeFavorite(item)}/>
				</View>
				</View>
			
			</TouchableOpacity>
		)
	}

	render(){
		return(
			<View>
				
			{(this.props.favorites.length) ? 
				<View style = {styles.list}>
					
					<FlatList 
						numColumns = {2}
						data = {this.props.favorites}
						renderItem = {({item}) => this.dispList(item)}
						keyExtractor = {item => item.imdbID}
					/>
				</View> 
				: 
				<View style = {styles.container}>
					<Text style = {styles.text}>Your Favorites will be here!</Text>
					<Text style = {styles.text}>Feel free to add some!</Text>
				</View>
			}
			</View>
		)
	}
}

const mapStateToProps = state => {
	return{
		favorites : state.favorite
	}
}

const mapDispatchToProps =  dispatch => {
	return{
		removeFavorite : movie => {
			dispatch(removeFavorite(movie))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen)