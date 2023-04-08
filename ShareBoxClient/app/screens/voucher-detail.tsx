import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../state/hook';
import {tokenSelector, userSelector} from '../state/auth-slice';
import {useMutation} from '@tanstack/react-query';

const VoucherDetail: (props: any) => JSX.Element = ({route}) => {
  const {voucher} = route.params;
  const user = useAppSelector(userSelector);
  const token = useAppSelector(tokenSelector);

  const isOwnRequest = voucher.user_id === user?.id;

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(
        `http://localhost:3000/api/v1/voucher_requests/${voucher.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
    },
  });

  const handleTakeRequest = () => {
    mutation.mutate();
  };

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

      {isOwnRequest ? (
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={handleTakeRequest}
            style={{
              // this to wrap the width of the content
              alignSelf: 'baseline',
              backgroundColor: 'red',
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
              Delete This Request
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={handleTakeRequest}
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
      )}
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
