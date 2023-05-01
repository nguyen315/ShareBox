import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import SignIn from '../screens/auths/sign-in';
import {getAuthFromAsyncStorage, tokenSelector} from '../state/auth-slice';
import {useAppDispatch, useAppSelector} from '../state/hook';
import BottomTabNavigator from './bottom-tab-navigator';
import SettingStackNavigator from './setting-stack-navigator';

const Stack = createNativeStackNavigator();

const RootNavigator: () => JSX.Element = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAuthFromAsyncStorage());
  }, [dispatch]);
  // user is logged in if have token
  const isLoggedIn = useAppSelector(tokenSelector);

  const renderNavigator = () => {
    if (isLoggedIn) {
      return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home Navigator" component={BottomTabNavigator} />
          <Stack.Screen
            name="Setting Stack"
            component={SettingStackNavigator}
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
