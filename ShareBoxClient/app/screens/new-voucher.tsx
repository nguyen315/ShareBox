import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Input from '../components/text-input';

const NewVoucherScreen = () => {
  const [value, setValue] = useState('');
  const [voucherType, setVoucherType] = useState('');

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
          onPress={() => {}}
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
