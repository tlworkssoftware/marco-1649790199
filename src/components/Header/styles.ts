import styled from 'styled-components/native';
import {
  sizeDynamic,
  TEXT_SIZE_HEADER_DEFAULT,
  heightPercentageToDP,
  isIOS,
  TEXT_SIZE_MEDIUM_DEFAULT,
} from '../../styles/config';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: ${isIOS
    ? heightPercentageToDP('4')
    : heightPercentageToDP('0.5')}px;
  height: ${heightPercentageToDP(isIOS ? '10' : '7')}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

export const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 10px;
`;

export const Button = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
`;

export const TitlePage = styled.Text`
  font-size: ${sizeDynamic(
    isIOS ? TEXT_SIZE_HEADER_DEFAULT : TEXT_SIZE_MEDIUM_DEFAULT,
  )}px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.white};
  text-align: center;
  max-width: 290px;
`;
