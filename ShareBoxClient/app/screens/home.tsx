import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import VoucherCard from '../components/voucher-card';
import {tokenSelector} from '../state/auth-slice';
import {useAppSelector} from '../state/hook';

type VoucherType = {
  id: string;
  voucher_type: string;
  value: number;
};

const HomeScreen: (props: any) => JSX.Element = ({navigation}: any) => {
  const token = useAppSelector(tokenSelector);

  const {isLoading, isFetching, data, refetch} = useQuery<VoucherType[]>({
    queryKey: ['voucher_requests'],
    queryFn: () => {
      const data = fetch(`http://localhost:3000/api/v1//voucher_requests`, {
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
        data={data}
        renderItem={({item}) => (
          <VoucherCard voucher={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
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
