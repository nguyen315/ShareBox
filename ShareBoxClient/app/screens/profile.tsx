import React from 'react';
import {Button, Image, SafeAreaView, Text, View} from 'react-native';
import {logout, userSelector} from '../state/auth-slice';
import {useAppDispatch, useAppSelector} from '../state/hook';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const handlePressLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
      <View
        style={{
          marginTop: 32,
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri:
              user?.avatar ||
              'https://gravatar.com/avatar/875eb34b42c43b9fceda6b7eccfa217a?s=400&d=identicon&r=x',
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
        <Text style={{textAlign: 'center', fontSize: 24, marginTop: 8}}>
          {user?.name || user?.username}
        </Text>
      </View>

      <View style={{marginTop: 32}}>
        <Button title="Log Out" onPress={handlePressLogout} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
