import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import SearchMovieScreen from '../screens/SearchMovieScreen'
import DetailsScreen from '../screens/DetailsScreen'

const MovieStack = createStackNavigator()

export default class MovieStackNavigator extends React.Component {
	render(){
		return(
			<MovieStack.Navigator 
					initialRouteName = 'SearchMovie'
					screenOptions = {{
						gestureEnabled : true,
						headerStyle: {
      						backgroundColor: 'grey',
							height : 85,
							borderRadius : 15,
						},
						headerTitleStyle: {
							
							fontWeight: 'bold',
							fontSize : 35,
							paddingBottom : 5,
    					},
    					headerTintColor: 'white',
						
						headerBackAllowFontScaling : true
					}}
					headerMode='screen'	
				>
					<MovieStack.Screen name = "SearchMovie" component = {SearchMovieScreen} options = {{
						title : "MoviPedia", 
						headerTitleAlign : 'center',}}/>
					<MovieStack.Screen name = "Details" component = {DetailsScreen} options = {{title :'About'}} 
						 />
						
				</MovieStack.Navigator>
		)
	}
}