import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {
  Category,
  Company,
  FormCompany,
  Setting,
  Welcome,
  FormCategory,
  Configs,
  FormNF,
} from '../screens';

import {BottomNavigator} from './bottom/bottom.navigation';
import {ThemeContext} from 'styled-components';
import {navigationRef} from '../utils/RootNavigation';

const Stack = createNativeStackNavigator();

export const StackNavigator: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          contentStyle: {
            backgroundColor: theme.colors.white,
          },
        }}
        initialRouteName={'Welcome'}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Company"
          component={Company}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FormCompany"
          component={FormCompany}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FormCategory"
          component={FormCategory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Configs"
          component={Configs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FormNF"
          component={FormNF}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
