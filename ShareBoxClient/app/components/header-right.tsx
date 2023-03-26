import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, TouchableHighlight, View} from 'react-native';

const HeaderRight = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Image
          source={{
            uri: 'https://gravatar.com/avatar/875eb34b42c43b9fceda6b7eccfa217a?s=400&d=identicon&r=x',
          }}
          style={{
            width: 35,
            height: 35,
            marginLeft: 'auto',
          }}
        />
      </TouchableHighlight>
    </View>
  );
};

export default HeaderRight;
