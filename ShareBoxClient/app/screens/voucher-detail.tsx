import {useMutation, useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {tokenSelector, userSelector} from '../state/auth-slice';
import {useAppSelector} from '../state/hook';
import {launchImageLibrary} from 'react-native-image-picker';
import {Field, Form} from 'react-final-form';
import Input from '../components/text-input';

const VoucherDetail: (props: any) => JSX.Element = ({route}) => {
  const {voucherId} = route.params;
  const user = useAppSelector(userSelector);
  const token = useAppSelector(tokenSelector);
  const [voucher, setVoucher] = useState<any>({id: voucherId});

  const {isLoading: isFetchingVoucher} = useQuery({
    queryKey: ['voucher_request'],
    queryFn: () => {
      return fetch(
        `http://localhost:3000/api/v1/voucher_requests/${voucherId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
    },
    onSuccess: async (response: any) => {
      const data = await response.json();
      setVoucher(data.voucher_request);
    },
  });

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(
        `http://localhost:3000/api/v1/voucher_requests/${voucherId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
    },
    onSuccess: async response => {
      const data = await response.json();
      setVoucher(data.data.voucher_request);
    },
  });

  const uploadImage = useMutation({
    mutationFn: ({imageUri}: any) => {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: 'image.jpg', // Replace with the actual image file name
        type: 'image/jpeg', // Replace with the actual image file type
      });

      return fetch(
        `http://localhost:3000/api/v1/voucher_requests/${voucherId}/image`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );
    },
  });

  const isOwnRequest = voucher.user_id === user?.id;
  const isHandleRequest = voucher.taken_by_user_id === user?.id;
  const isRequestHandled = !!voucher.taken_by_user_id;

  const handleTakeRequest = () => {
    mutation.mutate();
  };

  if (isFetchingVoucher) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const onSubmit = (values: any) => {
    const {photo} = values;
    uploadImage.mutate({imageUri: photo});
  };

  if (isHandleRequest) {
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

        <Text style={{textAlign: 'center', fontSize: 18, color: '#227C70'}}>
          You are handled this request. Please fill the voucher detail below
        </Text>

        <Form onSubmit={onSubmit}>
          {({handleSubmit}) => (
            <View>
              <Field name="photo">
                {({input}) => {
                  return !!input.value ? (
                    <>
                      <Image
                        source={{uri: input.value}}
                        style={{width: 200, height: 200, alignSelf: 'center'}}
                      />
                    </>
                  ) : (
                    <Button
                      title={'Upload Voucher Image'}
                      onPress={async () => {
                        const result = await launchImageLibrary({
                          mediaType: 'photo',
                        });
                        const assets = result?.assets || [];
                        const imageUri = assets[0].uri;
                        input.onChange(imageUri);
                      }}
                    />
                  );
                }}
              </Field>

              <Field name="voucher_code">
                {({input}) => {
                  return (
                    <Input
                      label="Voucher Code"
                      onChangeText={input.onChange}
                      value={input.value}
                    />
                  );
                }}
              </Field>
              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity
                  onPress={handleSubmit}
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
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Form>
      </View>
    );
  }

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
            disabled={mutation.isLoading}
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
