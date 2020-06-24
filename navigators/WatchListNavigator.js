import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import WatchListScreen from '../screens/WatchListScreen'
import DetailsScreen from '../screens/DetailsScreen'

const WatchStack = createStackNavigator()

export default class WatchListNavigator extends React.Component {
	render(){
		return(
			<WatchStack.Navigator 
					initialRouteName = 'WatchList'
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
					<WatchStack.Screen name = "WatchList" component = {WatchListScreen} options = {{
						title : "Watch List", 
						headerTitleAlign : 'center',}}/>
					<WatchStack.Screen name = "Details" component = {DetailsScreen} options = {{title :'About'}} 
						 />
						
				</WatchStack.Navigator>
		)
	}
}