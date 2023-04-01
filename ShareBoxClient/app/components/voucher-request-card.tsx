import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const VoucherRequestCard = ({voucherRequest, navigation}: any) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'flex-start',
        backgroundColor: '#dedede',
        padding: 10,
        margin: 10,
        borderRadius: 10,
      }}
      onPress={() =>
        navigation.navigate('Voucher Request Detail', {voucherRequest})
      }>
      <View>
        <Text style={{fontSize: 16}}>Type: {voucherRequest.voucher_type}</Text>
        <Text style={{fontSize: 16}}>Value: {voucherRequest.value}</Text>
        <Text style={{fontSize: 16}}>Price: {voucherRequest.value * 0.8}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VoucherRequestCard;
