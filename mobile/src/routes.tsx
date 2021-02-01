import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import OrphanegesMap from './pages/OrphanegesMap';
import OrphanegeDetails from './pages/OrphanegeDetails';

export default function routes() {
  return(
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }} >
        <Screen name="OrphanegesMap" component={OrphanegesMap} />
        <Screen name="OrphanegesDetails" component={OrphanegeDetails} />
      </Navigator>
    </NavigationContainer>
  )
  
}

