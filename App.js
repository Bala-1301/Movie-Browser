import React from 'react'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import MainTabNavigator from './navigators/MainTabNavigator'
import {store, persistor} from './redux/store'

export default class App extends React.Component {
	render(){
		return(
			
				<Provider store = {store}>
					<PersistGate loading = {null} persistor = {persistor}>
						<MainTabNavigator />
					</PersistGate>
				</Provider>
			
		)
	}
}