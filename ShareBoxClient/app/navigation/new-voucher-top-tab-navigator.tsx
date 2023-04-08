import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewVoucherRequestScreen from '../screens/new-voucher-request';
import NewVoucherScreen from '../screens/new-voucher';

const Tab = createMaterialTopTabNavigator();

function NewVoucherTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="New Voucher Request"
        component={NewVoucherRequestScreen}
      />
      <Tab.Screen name="New Voucher" component={NewVoucherScreen} />
    </Tab.Navigator>
  );
}

export default NewVoucherTabs;
