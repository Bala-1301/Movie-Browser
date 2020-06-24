import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import MovieStackNavigator from './MovieStackNavigator'
import WatchListNavigator from './WatchListNavigator'
import FavoritesNavigator from './FavoritesNavigator'

const Tab = createBottomTabNavigator()

export default class MainTabNavigator extends React.Component{
	render(){
		return(
			<NavigationContainer>
				<Tab.Navigator
					initialRouteName = 'Movie'
					tabBarOptions = {{
						keyboardHidesTabBar : true,
						showLabel : false,
						activeTintColor : '#808080',
						activeBackgroundColor : '#e6e6fa'
					}}
					screenOptions={({ route }) => ({
						gestureEnabled : true,
        				tabBarIcon: ({ focused }) => {
            				let iconName;

            				if (route.name === 'Movie') {
              					iconName = 'search'
                				
	            			} else if (route.name === 'WatchList') {
    	          				iconName ='collections-bookmark'
        	    			}
							else if(route.name == 'Favorites'){
								iconName = focused ? 'favorite' : 'favorite-border'
							}
							return <Icon name={iconName} size = {25}/>;
          					},
       				})}
					backBehavior = 'initialRoute'
					
				>
					<Tab.Screen name = 'WatchList' component ={WatchListNavigator} />
					<Tab.Screen name = 'Movie' component = {MovieStackNavigator} />
					<Tab.Screen name = 'Favorites' component = {FavoritesNavigator} />
				</Tab.Navigator>
			</NavigationContainer>
		)
	}
}