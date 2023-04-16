import React from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {logout, userSelector} from '../state/auth-slice';
import {useAppDispatch, useAppSelector} from '../state/hook';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePressLogout: () => void = () => {
    dispatch(logout());
  };

  const handlePressChangePassword: () => void = () => {
    navigation.navigate('Change Password');
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
      <ScrollView
        style={{width: '100%', marginTop: 16}}
        contentContainerStyle={{alignItems: 'flex-start'}}>
        <TouchableOpacity style={[styles.listItem, styles.borderBottom]}>
          <Text style={{fontSize: 18}}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressChangePassword}
          style={[styles.listItem, styles.borderBottom]}>
          <Text style={{fontSize: 18}}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressLogout} style={[styles.listItem]}>
          <Text style={{fontSize: 18}}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingLeft: 16,
    height: 40,
    justifyContent: 'center',
    width: '100%',
  },
  borderBottom: {
    borderBottomColor: '#4D4D4D',
    borderBottomWidth: 0.5,
  },
});

export default ProfileScreen;
