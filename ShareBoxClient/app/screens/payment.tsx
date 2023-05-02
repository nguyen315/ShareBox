import {useMutation, useQuery} from '@tanstack/react-query';
import React from 'react';
import {Field, Form} from 'react-final-form';
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Config from 'react-native-config';
import Input from '../components/text-input';
import {tokenSelector, userSelector} from '../state/auth-slice';
import {useAppSelector} from '../state/hook';

const PaymentScreen = () => {
  const user = useAppSelector(userSelector);
  const token = useAppSelector(tokenSelector);

  const submitPaymentMethodMutation = useMutation<
    unknown,
    unknown,
    {method: string; account_number: string}
  >({
    mutationFn: async paymentValues => {
      const response = await fetch(
        `${Config.API_URL}/api/v1/users/${user?.id}/payments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentValues),
        },
      );

      return await response.json();
    },
    onSuccess: data => {
      console.log(data);
    },
  });

  const {
    isLoading,
    isFetching,
    data: paymentsData,
  } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const response = await fetch(
        `${Config.API_URL}/api/v1/users/${user?.id}/payments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return await response.json();
    },
  });

  const onSubmit = (values: any) => {
    const submitValues = {
      method: values.paymentMethod,
      account_number: values.accountNumber,
    };
    submitPaymentMethodMutation.mutate(submitValues);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
        <Form onSubmit={onSubmit} style={{marginTop: 16}}>
          {/* put 2 way to impl Field here */}
          {({handleSubmit}) => (
            <View>
              <Field name="paymentMethod">
                {({input}) => {
                  return (
                    <Input
                      label="Payment method"
                      value={input.value}
                      onChangeText={input.onChange}
                    />
                  );
                }}
              </Field>
              <Field
                name="accountNumber"
                render={({input}) => (
                  <Input
                    label="Account number"
                    value={input.value}
                    onChangeText={input.onChange}
                    style={{marginTop: 16}}
                  />
                )}
              />
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          )}
        </Form>

        <ScrollView style={{marginTop: 16}}>
          {isLoading || isFetching ? (
            <Text>loading...</Text>
          ) : (
            <View>
              {paymentsData?.payments?.map((payment: any) => (
                <View key={payment.id}>
                  <Text>{payment.method}</Text>
                  <Text>{payment.account_number}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
