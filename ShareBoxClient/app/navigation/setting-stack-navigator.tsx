import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BackButton from '../components/commons/back-button';
import ChangePasswordScreen from '../screens/change-password';
import PaymentScreen from '../screens/payment';
import ProfileScreen from '../screens/profile';

const Stack = createNativeStackNavigator();

const SettingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackButton />,
      }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default SettingStackNavigator;
