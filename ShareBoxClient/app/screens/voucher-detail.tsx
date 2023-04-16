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
import {User, tokenSelector, userSelector} from '../state/auth-slice';
import {useAppSelector} from '../state/hook';
import {launchImageLibrary} from 'react-native-image-picker';
import {Field, Form} from 'react-final-form';
import Input from '../components/text-input';

const VoucherDetail: (props: any) => JSX.Element = ({route}) => {
  const {voucherId} = route.params;
  const user = useAppSelector(userSelector);
  const token = useAppSelector(tokenSelector);
  const [voucher, setVoucher] = useState<any>({id: voucherId});
  const [userOwnRequest, setUserOwnRequest] = useState<User>();
  const [userHandleRequest, setUserHandleRequest] = useState<User>();

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
      const voucherRequest = data.voucher_request;
      setVoucher(voucherRequest);
      const users: User[] = data.include.users;
      const userOwnRequest = users.find(u => u.id === voucherRequest.user_id);
      const userHandleRequest = users.find(
        u => u.id === voucherRequest.taken_by_user_id,
      );
      setUserOwnRequest(userOwnRequest);
      setUserHandleRequest(userHandleRequest);
    },
  });

  const takeVoucherMutation = useMutation({
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
      const {data} = await response.json();
      const voucherRequest = data.voucher_request;
      setVoucher(voucherRequest);

      const users: User[] = data.include.users;
      const userOwnRequest = users.find(u => u.id === voucherRequest.user_id);
      const userHandleRequest = users.find(
        u => u.id === voucherRequest.taken_by_user_id,
      );
      setUserOwnRequest(userOwnRequest);
      setUserHandleRequest(userHandleRequest);
    },
  });

  const submitVoucher = useMutation({
    mutationFn: ({imageUri, voucherCode}: any) => {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: 'image.jpg', // Replace with the actual image file name
        type: 'image/jpeg', // Replace with the actual image file type
      });
      formData.append('voucher_code', voucherCode);

      return fetch(
        `http://localhost:3000/api/v1/voucher_requests/${voucherId}/voucher`,
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
  const isVoucherUploaded = !!voucher.voucher_image_url;

  // TODO: clean it to another component
  const renderVoucherOverview = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          elevation: 5,
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 4,
          marginBottom: 16,
        }}>
        <View style={[styles.flexRow]}>
          <Text style={{fontSize: 18}}>Requested by</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{
                uri:
                  userOwnRequest?.avatar ||
                  'https://gravatar.com/avatar/875eb34b42c43b9fceda6b7eccfa217a?s=400&d=identicon&r=x',
              }}
              style={{
                width: 35,
                height: 35,
                marginRight: 10,
              }}
            />
            <Text style={{fontSize: 18}}>
              {userOwnRequest?.name || userOwnRequest?.username}
            </Text>
          </View>
        </View>
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
        {!!userHandleRequest && (
          <View style={[styles.flexRow]}>
            <Text style={{fontSize: 18}}>Handle By User</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri:
                    userHandleRequest?.avatar ||
                    'https://gravatar.com/avatar/875eb34b42c43b9fceda6b7eccfa217a?s=400&d=identicon&r=x',
                }}
                style={{
                  width: 35,
                  height: 35,
                  marginRight: 10,
                }}
              />
              <Text style={{fontSize: 18}}>
                {userHandleRequest?.name || userHandleRequest?.username}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  // TODO: clean it to another component
  const renderUploadVoucherForm = () => (
    <Form onSubmit={onSubmit}>
      {({handleSubmit}) => (
        <View>
          <Field name="photo">
            {({input}) => {
              return !!input.value ? (
                <>
                  <Image
                    source={{uri: input.value}}
                    style={{
                      width: 200,
                      height: 200,
                      alignSelf: 'center',
                    }}
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

          <Field name="voucherCode">
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
  );

  const handleTakeRequest = () => {
    takeVoucherMutation.mutate();
  };

  const onSubmit = (values: any) => {
    const {photo, voucherCode} = values;
    submitVoucher.mutate({imageUri: photo, voucherCode});
  };

  if (isFetchingVoucher) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isHandleRequest) {
    return (
      <View style={styles.container}>
        {renderVoucherOverview()}

        {!!isVoucherUploaded ? (
          <>
            <Image
              source={{uri: voucher.voucher_image_url}}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
              }}
            />
          </>
        ) : (
          <>
            <Text style={{textAlign: 'center', fontSize: 18, color: '#227C70'}}>
              You are handled this request. Please fill the voucher detail below
            </Text>
            {renderUploadVoucherForm()}
          </>
        )}
      </View>
    );
  }

  if (isVoucherUploaded) {
    return (
      <View style={styles.container}>
        {renderVoucherOverview()}
        <Image
          source={{uri: voucher.voucher_image_url}}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
        />
        {isOwnRequest && (
          <Text style={{textAlign: 'center', fontSize: 18}}>
            Please pay to the user fulfill your request
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderVoucherOverview()}

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
            disabled={takeVoucherMutation.isLoading}
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
    alignItems: 'center',
  },
});

export default VoucherDetail;
