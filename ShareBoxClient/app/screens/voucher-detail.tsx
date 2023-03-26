import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const VoucherDetail: (props: any) => JSX.Element = ({route}) => {
  const {item} = route.params;

  const copyVoucherCode = () => {
    Clipboard.setString(item.code.toString());
  };

  return (
    <View style={styles.container}>
      <View style={[styles.flexRow]}>
        <Text style={{fontSize: 16, marginRight: 40}}>Type</Text>
        <Text style={{fontSize: 16}}>{item.type}</Text>
      </View>

      <TouchableOpacity
        style={[{marginVertical: 10, alignItems: 'center'}, styles.flexRow]}
        onPress={copyVoucherCode}>
        <View>
          <Text style={{fontSize: 20}}>Voucher Code</Text>
          <Text style={{fontSize: 20}}>{item.code}</Text>
        </View>
        <MaterialIcons name="content-copy" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={{marginVertical: 10}} onPress={copyVoucherCode}>
        <Text style={{fontSize: 16}}>Verify Code</Text>
        <Text style={{fontSize: 16}}>{item.verifyCode}</Text>
      </TouchableOpacity>
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
  },
});

export default VoucherDetail;
