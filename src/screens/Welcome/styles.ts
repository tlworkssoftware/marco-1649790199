import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {heightPercentageToDP, isIOS, sizeDynamic} from '../../styles/config';

export const ImageBackground = styled.ImageBackground`
  position: absolute;
  width: 100%;
  height: 100%;
  top: ${isIOS ? heightPercentageToDP('-11') : heightPercentageToDP('-4')}px;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Wrapper = styled(Animated.View)`
  flex: 1;
`;

export const WrapperLogo = styled(Animated.View)`
  align-self: center;
  margin-top: ${heightPercentageToDP('20')}px;
  margin-bottom: ${heightPercentageToDP('10')}px;
`;

export const LogoText = styled.Text`
  align-self: center;
  font-size: ${sizeDynamic(25)}px;
  color: ${({theme}) => theme.colors.white};
  font-weight: 500;
`;
