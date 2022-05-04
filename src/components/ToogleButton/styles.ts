import styled from 'styled-components/native';
import {sizeDynamic, TEXT_SIZE_MEDIUM_DEFAULT} from '../../styles/config';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: ${sizeDynamic(TEXT_SIZE_MEDIUM_DEFAULT)}px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.greyLight200};
`;

export const Toggle = styled.Switch``;
