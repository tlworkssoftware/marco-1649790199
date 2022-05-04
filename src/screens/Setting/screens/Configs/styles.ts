import styled from 'styled-components/native';
import {sizeDynamic, TEXT_SIZE_MEDIUM_DEFAULT} from '../../../../styles/config';

export const Container = styled.View`
  flex: 1;
  background: ${({theme}) => theme.colors.background};
  height: 100%;
`;

export const ContainerForm = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
  padding: 26px;
`;

export const Group = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Legend = styled.Text`
  font-size: ${sizeDynamic(TEXT_SIZE_MEDIUM_DEFAULT)}px;
  color: ${({theme}) => theme.colors.greyLight250};
  font-family: ${({theme}) => theme.fonts.regular};
`;
