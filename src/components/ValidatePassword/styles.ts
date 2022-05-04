import styled from 'styled-components/native';
import {TEXT_SIZE_REGULAR_DEFAULT, sizeDynamic} from '../../styles/config';

export const ValidationPassWrapper = styled.View`
  margin-bottom: 15px;
`;

export const MessageWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Description = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${sizeDynamic(TEXT_SIZE_REGULAR_DEFAULT)}px;
  line-height: 24px;
  color: ${({theme}) => theme.colors.greyLight100};
  padding: 0 10px;
`;
