import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import Input from '../components/text-input';

const ChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
        <Input
          label="Old password"
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <Input
          label="New password"
          value={newPassword}
          onChangeText={setNewPassword}
          style={{marginTop: 16}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
