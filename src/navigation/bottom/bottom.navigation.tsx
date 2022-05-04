import React, {useContext, useLayoutEffect} from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {ThemeContext} from 'styled-components';
import IconVetor from 'react-native-vector-icons/AntDesign';

import {Coast, History, Home, NF, Settings} from '../../screens';

import {
  Container,
  TabActive,
  Title,
  TouchableOpacityItem,
  TouchContainer,
} from './styles';

const Tabs = createBottomTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const theme = useContext(ThemeContext);

  useLayoutEffect(() => {
    IconVetor.loadFont();
  }, []);

  function getIcon(routeName: string) {
    switch (routeName) {
      case 'Home': {
        return 'home';
      }
      case 'History': {
        return 'bars';
      }
      case 'launchReceipt': {
        return 'pluscircleo';
      }
      case 'launchCoast': {
        return 'minus';
      }
      case 'Settings': {
        return 'setting';
      }
      default: {
        return '';
      }
    }
  }

  return (
    <Container>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let color = isFocused
          ? theme.colors.primary
          : theme.colors.greyLight100;

        const iconName = getIcon(route.name);

        return (
          <TouchableOpacityItem
            key={Math.random()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <TouchContainer>
              <TabActive active={isFocused} />
              <IconVetor name={iconName} size={25} color={color} />
              <Title color={color}>{label}</Title>
            </TouchContainer>
          </TouchableOpacityItem>
        );
      })}
    </Container>
  );
};

export const BottomNavigator: React.FC = () => {
  return (
    <Tabs.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{tabBarLabel: 'Home'}}
      />
      <Tabs.Screen
        name="History"
        component={History}
        options={{tabBarLabel: 'Histórico'}}
      />
      <Tabs.Screen
        name="launchReceipt"
        component={NF}
        options={{tabBarLabel: 'NFs-e'}}
      />
      <Tabs.Screen
        name="launchCoast"
        component={Coast}
        options={{tabBarLabel: 'Despesa'}}
      />
      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{tabBarLabel: 'Preferências'}}
      />
    </Tabs.Navigator>
  );
};
