import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

const HeaderRight = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Setting Stack');
        }}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/nguyen315/image/upload/v1682241471/peluga_xvpwt4.jpg',
          }}
          style={{
            width: 35,
            height: 35,
            borderRadius: 50,
            marginLeft: 'auto',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
