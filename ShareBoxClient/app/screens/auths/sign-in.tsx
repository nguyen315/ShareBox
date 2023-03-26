import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '../../components/text-input';
import {useLoginMutation} from '../../services/api';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMutation] = useLoginMutation();

  const handlePressLogin = () => {
    loginMutation({username, password});
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: '#227C70'}}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          marginTop: 96,
          padding: 24,
          width: 300,
        }}>
        <View style={{marginBottom: 32, alignSelf: 'center'}}>
          <Text style={{fontWeight: '600', fontSize: 24}}>ShareBox</Text>
        </View>
        <View style={{}}>
          <Input
            value={username}
            onChangeText={setUsername}
            label="Username"
            style={{marginVertical: 8}}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            label="Password"
            style={{marginVertical: 8}}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={handlePressLogin}
          style={{
            padding: 16,
            marginTop: 24,
            backgroundColor: '#227C70',
            borderRadius: 16,
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: '#fff',
              fontWeight: '600',
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
