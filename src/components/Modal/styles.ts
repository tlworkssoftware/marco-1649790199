import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';
import {
  heightPercentageToDP,
  isIOS,
  sizeDynamic,
  TEXT_SIZE_HEADER_DEFAULT,
  TEXT_SIZE_MEDIUM_DEFAULT,
} from '../../styles/config';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 999;
`;

export const Body = styled.View`
  background: white;
  width: 100%;
  height: ${heightPercentageToDP(isIOS ? '50' : '50')}px;
  padding: 15px;
  position: absolute;
  bottom: 0px;
`;

export const Close = styled.TouchableOpacity`
  align-items: flex-end;
`;

export const CloseIcon = styled(SvgXml)``;

export const Title = styled.Text`
  align-self: center;
  text-align: center;
  font-size: ${sizeDynamic(TEXT_SIZE_HEADER_DEFAULT)}px;
  color: ${({theme}) => theme.colors.greyLight200};
  margin-top: ${heightPercentageToDP(isIOS ? '2' : '0')}px;
  margin-bottom: ${heightPercentageToDP(isIOS ? '5' : '5')}px;
  font-weight: 700;
  width: 75%;
`;

export const Subtitle = styled.Text`
  align-self: center;
  text-align: center;
  font-size: ${sizeDynamic(TEXT_SIZE_MEDIUM_DEFAULT)}px;
  color: ${({theme}) => theme.colors.greyLight200};
  margin-bottom: ${heightPercentageToDP(isIOS ? '5' : '5')}px;
  width: 75%;
`;
