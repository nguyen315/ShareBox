import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const VoucherCard = ({voucher, navigation}: any) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'flex-start',
        backgroundColor: '#E6E2C3',
        padding: 10,
        margin: 10,
        borderRadius: 10,
      }}
      onPress={() => navigation.navigate('Voucher Detail', {voucher})}>
      <View>
        <Text style={{fontSize: 16}}>Type: {voucher.voucher_type}</Text>
        <Text style={{fontSize: 16}}>Value: {voucher.value}</Text>
        <Text style={{fontSize: 16}}>Price: {voucher.value * 0.8}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VoucherCard;
