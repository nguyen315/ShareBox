import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const VoucherCard = ({item, navigation}: any) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'flex-start',
        backgroundColor: '#dedede',
        padding: 10,
        margin: 10,
        borderRadius: 10,
      }}
      onPress={() => navigation.navigate('Voucher Detail', {item})}>
      <View>
        <Text style={{fontSize: 16}}>Type: {item.voucher_type}</Text>
        <Text style={{fontSize: 16}}>Value: {item.value}</Text>
        {/* <Text style={{fontSize: 16}}>Price: {item.value * 0.8}</Text>
        <Text style={{fontSize: 16}}>Owner: {item.user?.name}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default VoucherCard;
