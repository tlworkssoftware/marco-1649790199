import React, {MutableRefObject, useContext, useEffect, useRef} from 'react';
import {Keyboard, Animated} from 'react-native';
import {ThemeContext} from 'styled-components';
import {Login, Register} from './components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIOS, sizeDynamic} from '../../styles/config';
import {
  Container,
  ImageBackground,
  LogoText,
  Wrapper,
  WrapperLogo,
} from './styles';

const Tab = createMaterialTopTabNavigator();

const Welcome: React.FC = () => {
  const theme = useContext(ThemeContext);
  const animatedFormValue: MutableRefObject<any> = useRef(
    new Animated.Value(0),
  );
  const animatedLogoValue: MutableRefObject<any> = useRef(
    new Animated.Value(0),
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        animatedStart();
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        animatedEnd();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  });

  function animatedStart() {
    Animated.parallel([
      Animated.spring(animatedFormValue.current, {
        toValue: -170,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.spring(animatedLogoValue.current, {
        toValue: isIOS ? 60 : 50,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function animatedEnd() {
    Animated.parallel([
      Animated.spring(animatedFormValue.current, {
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.spring(animatedLogoValue.current, {
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start();
  }

  return (
    <Container>
      <ImageBackground source={require('../../assets/images/background.png')} />
      <Wrapper
        style={{
          flex: 1,
          transform: [
            {
              translateY: animatedFormValue.current,
            },
          ],
        }}>
        <WrapperLogo
          style={{
            transform: [
              {
                translateY: animatedLogoValue.current,
              },
            ],
          }}>
          <LogoText>Controle NFs-e</LogoText>
        </WrapperLogo>

        <Tab.Navigator
          screenOptions={() => ({
            tabBarStyle: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.greyLight100,
            tabBarLabelStyle: {
              textTransform: 'capitalize',
              fontSize: sizeDynamic(14),
            },
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.primary,
            },
          })}>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Cadastrar" component={Register} />
        </Tab.Navigator>
      </Wrapper>
    </Container>
  );
};

export default Welcome;
