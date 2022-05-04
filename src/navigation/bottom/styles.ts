import styled from 'styled-components/native';
import {isIOS, sizeDynamic} from '../../styles/config';

export const Container = styled.View`
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.white};
`;

export const TouchContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 9px;
  position: relative;
`;

export const Title = styled.Text<{color: string}>`
  color: ${props => props.color};
  font-size: ${sizeDynamic(12)}px;
  margin-top: ${isIOS ? 5 : 3}px;
`;

export const TouchableOpacityItem = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 20px;
`;

export const TabActive = styled.View<{active: boolean}>`
  height: 3px;
  width: 62px;
  position: absolute;
  top: 0px;
  background-color: ${({theme, active}) =>
    active ? theme.colors.primary : theme.colors.white};
`;
