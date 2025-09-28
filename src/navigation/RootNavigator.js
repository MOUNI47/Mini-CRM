
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme as PaperDefault, DarkTheme as PaperDark } from 'react-native-paper';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import CustomerListScreen from '../screens/Customers/CustomerListScreen';
import CustomerDetailsScreen from '../screens/Customers/CustomerDetailsScreen';
import LeadFormScreen from '../screens/Leads/LeadFormScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const auth = useSelector(state => state.auth);
  const isDark = false;
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={isDark ? PaperDark : PaperDefault}>
        <Stack.Navigator>
          { !auth.token ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Customers" component={CustomerListScreen} />
              <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />
              <Stack.Screen name="LeadForm" component={LeadFormScreen} />
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
            </>
          )}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
