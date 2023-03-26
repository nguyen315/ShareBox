import React from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {logout} from '../state/auth-slice';
import {useAppDispatch} from '../state/hook';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();

  const handlePressLogout = () => {
    dispatch(logout());
  };
  return (
    <SafeAreaView>
      <View>
        <Button title="Log Out" onPress={handlePressLogout} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
