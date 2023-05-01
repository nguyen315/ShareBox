import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Input from '../../components/text-input';
import {login} from '../../state/auth-slice';

const SignIn = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation<
    {user: object; token: string},
    unknown,
    {username: string; password: string}
  >({
    mutationFn: async userCredential => {
      const response = await fetch(`${Config.API_URL}/api/v1/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(userCredential),
      });

      return await response.json();
    },
    onSuccess: data => {
      dispatch(login(data));
    },
  });

  const handlePressLogin = () => {
    loginMutation.mutate({username, password});
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
