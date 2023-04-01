import React from 'react';
import {SafeAreaView, Text} from 'react-native';

const VoucherRequestDetail = ({route}: any) => {
  const {voucherRequest} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Voucher Type: {voucherRequest?.voucher_type}</Text>
    </SafeAreaView>
  );
};

export default VoucherRequestDetail;
