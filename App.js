import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './screens/SearchScreen';
import TrailScreen from './screens/TrailScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import trailReducer from './reducers/trailReducer';

const rootReducer = combineReducers({
  trail: trailReducer
});
const store = createStore(rootReducer);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen
            name="Search"
            component={SearchScreen}
          />
          <Stack.Screen
            name="Trail"
            component={TrailScreen}
          />
          <Stack.Screen 
            name="Search Results"
            component={SearchResultScreen}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
