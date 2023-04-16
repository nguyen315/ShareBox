import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from '../screens/profile';
import ChangePasswordScreen from '../screens/change-password';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const SettingStackNavigator = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleGoBack: () => void = () => {
    navigation.goBack();
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // TODO: clean up Back button to its component
          headerLeft: () => {
            return <Button title="Back" onPress={handleGoBack} />;
          },
        }}
      />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
};

export default SettingStackNavigator;
