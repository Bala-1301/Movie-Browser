import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import FavoritesScreen from '../screens/FavoritesScreen'
import DetailsScreen from '../screens/DetailsScreen'

const FavStack = createStackNavigator()

export default class FavoritesNavigator extends React.Component {
	render(){
		return(
			<FavStack.Navigator 
					initialRouteName = 'Favorite'
					screenOptions = {{
						gestureEnabled : true,
						headerStyle: {
      						backgroundColor: 'skyblue',
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
					<FavStack.Screen name = "Favorite" component = {FavoritesScreen} options = {{
						title : "Favorites", 
						headerTitleAlign : 'center',}}/>
					<FavStack.Screen name = "Details" component = {DetailsScreen} options = {{title :'About'}} />
						
				</FavStack.Navigator>
		)
	}
}