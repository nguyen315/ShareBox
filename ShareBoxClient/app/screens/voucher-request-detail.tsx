import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

const VoucherRequestDetail = ({route}: any) => {
  const {voucherRequest} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 16}}>
        <Text style={{fontSize: 16}}>
          Voucher Type: {voucherRequest?.voucher_type}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default VoucherRequestDetail;
