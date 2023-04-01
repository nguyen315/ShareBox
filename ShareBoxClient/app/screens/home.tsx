import React from 'react';
import {StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';
import {DATA} from '../../mockData';

import VoucherCard from '../components/voucher-card';
import {useQuery} from '@tanstack/react-query';
import {useAppSelector} from '../state/hook';
import {tokenSelector} from '../state/auth-slice';
import useRefetchOnFocus from '../hooks/useRefetchOnFocus';

const HomeScreen: (props: any) => JSX.Element = ({navigation}: any) => {
  const token = useAppSelector(tokenSelector);

  const {isLoading, isFetching, data, refetch} = useQuery({
    queryKey: ['voucher_request'],
    queryFn: () => {
      const data = fetch('http://localhost:3000/api/v1/voucher_requests', {
        method: 'GET',
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => data.voucher_requests);

      return data;
    },
  });

  useRefetchOnFocus(refetch);

  if (isLoading || isFetching) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data as any[]}
        renderItem={({item}) => (
          <VoucherCard item={item} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
