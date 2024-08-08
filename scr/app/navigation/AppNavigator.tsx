import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import PhotoDetailScreen from '../../screens/PhotoDetailScreen';

type RootStackParamList = {
  Home: undefined;
  PhotoDetail: {photoUrl: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PhotoDetail" component={PhotoDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
