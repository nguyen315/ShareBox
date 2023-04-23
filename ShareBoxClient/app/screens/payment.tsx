import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import Input from '../components/text-input';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
        <Input
          label="Payment method"
          value={paymentMethod}
          onChangeText={setPaymentMethod}
        />
        <Input
          label="Account number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          style={{marginTop: 16}}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
