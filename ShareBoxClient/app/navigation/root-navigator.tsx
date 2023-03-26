import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SignIn from '../screens/auths/sign-in';
import ProfileScreen from '../screens/profile';
import {tokenSelector} from '../state/auth-slice';
import {useAppSelector} from '../state/hook';
import BottomTabNavigator from './bottom-tab-navigator';

const Stack = createNativeStackNavigator();

const RootNavigator: () => JSX.Element = () => {
  const token = useAppSelector(tokenSelector);

  const renderNavigator = () => {
    if (token) {
      return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home Navigator" component={BottomTabNavigator} />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      );
    }

    return (
      <Stack.Navigator screenOptions={{header: () => null}}>
        <Stack.Screen name="Sign In" component={SignIn} />
      </Stack.Navigator>
    );
  };

  return <NavigationContainer>{renderNavigator()}</NavigationContainer>;
};

export default RootNavigator;
