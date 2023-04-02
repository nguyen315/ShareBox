import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const VoucherDetail: (props: any) => JSX.Element = ({route}) => {
  const {voucher} = route.params;

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.flexRow]}>
          <Text style={{fontSize: 18}}>Type</Text>
          <Text style={{fontSize: 18}}>{voucher.voucher_type}</Text>
        </View>
        <View style={[styles.flexRow]}>
          <Text style={{fontSize: 18}}>Value</Text>
          <Text style={{fontSize: 18}}>{voucher.value}</Text>
        </View>
        <View style={[styles.flexRow]}>
          <Text style={{fontSize: 18}}>Price</Text>
          <Text style={{fontSize: 18}}>{voucher.value * 0.6}</Text>
        </View>
      </View>

      <View style={{alignSelf: 'center'}}>
        <TouchableOpacity
          style={{
            // this to wrap the width of the content
            alignSelf: 'baseline',
            backgroundColor: '#227C70',
            borderRadius: 8,
            marginTop: 16,
            paddingHorizontal: 24,
            paddingVertical: 16,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#fff',
              fontWeight: '600',
            }}>
            Take This Request
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginVertical: 10,
  },
});

export default VoucherDetail;
