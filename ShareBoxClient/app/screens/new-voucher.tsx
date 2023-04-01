import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Input from '../components/text-input';
import {tokenSelector} from '../state/auth-slice';
import {useAppSelector} from '../state/hook';

const NewVoucherScreen = () => {
  const [value, setValue] = useState('');
  const [voucherType, setVoucherType] = useState('');
  const token = useAppSelector(tokenSelector);

  const mutation = useMutation<
    unknown,
    unknown,
    {voucher_type: string; value: number}
  >({
    mutationFn: newVoucher => {
      return fetch('http://localhost:3000/api/v1/voucher_requests', {
        method: 'POST',
        body: JSON.stringify(newVoucher),
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    },
  });

  const handleSubmitNewVoucher = () => {
    mutation.mutate({voucher_type: voucherType, value: Number(value)});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, marginHorizontal: 16, marginTop: 32}}>
        <Input
          label="Voucher Type"
          value={voucherType}
          onChangeText={setVoucherType}
          style={{marginVertical: 8}}
        />
        <Input
          label="Value"
          value={value}
          onChangeText={setValue}
          style={{marginVertical: 8}}
        />

        <TouchableOpacity
          onPress={handleSubmitNewVoucher}
          style={{
            padding: 16,
            marginTop: 24,
            backgroundColor: '#227C70',
            borderRadius: 16,
            marginHorizontal: 16,
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: '#fff',
              fontWeight: '600',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
});

export default NewVoucherScreen;
