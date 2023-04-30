import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BackButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const canGoBack = navigation.canGoBack();
  const handleGoBack = () => {
    navigation.goBack();
  };
  if (canGoBack) {
    return (
      <TouchableOpacity onPress={handleGoBack}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  return null;
};

export default BackButton;
