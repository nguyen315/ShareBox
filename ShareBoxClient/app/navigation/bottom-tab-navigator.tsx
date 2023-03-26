import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderRight from '../components/header-right';
import HomeScreen from '../screens/home';
import NewVoucherScreen from '../screens/new-voucher';
import VoucherDetail from '../screens/voucher-detail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <HeaderRight />,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Voucher Detail" component={VoucherDetail} />
    </Stack.Navigator>
  );
};

const NewVoucherStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <HeaderRight />,
      }}>
      <Stack.Screen name="New Voucher" component={NewVoucherScreen} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.tabBar,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home Stack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 12}}>
              <MaterialIcons
                name="home"
                size={30}
                color={focused ? '#fff' : ''}
              />

              <Text style={{color: focused ? '#fff' : ''}}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="New Voucher"
        component={NewVoucherStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 12}}>
              <MaterialIcons
                name="star-outline"
                size={30}
                color={focused ? '#fff' : ''}
              />

              <Text style={{color: focused ? '#fff' : ''}}>New Voucher</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#227C70',
    elevation: 0,
    borderRadius: 16,
    height: 64,
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
  },
});

export default BottomTabNavigator;
