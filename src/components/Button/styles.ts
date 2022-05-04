import {sizeDynamic, TEXT_SIZE_MEDIUM_DEFAULT} from '../../styles/config';
import styled, {css} from 'styled-components/native';

export const TouchableOpacityCustom = styled.TouchableOpacity<{
  type: string;
  disabled?: boolean;
  width: number;
  height: number;
}>`
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 14px;
  flex-direction: row;
  width: ${({width}) => width}%;
  height: ${({height}) => height}px;

  ${({theme, type, disabled}) => css`
    background-color: ${disabled && type === 'primary'
      ? theme.colors.greyLight150
      : type === 'primary'
      ? theme.colors.primary
      : theme.colors.white};
    border-color: ${disabled
      ? theme.colors.greyLight150
      : type === 'primary'
      ? theme.colors.greyLight150
      : type === 'link' || type === 'linkHighlight'
      ? theme.colors.white
      : type === 'outlineDanger'
      ? theme.colors.red
      : theme.colors.primary};
    border-width: 1px;
  `}
`;

export const TextCustom = styled.Text<{type: string; disabled?: boolean}>`
  font-weight: 600;
  font-size: ${TEXT_SIZE_MEDIUM_DEFAULT}px;
  color: ${({theme, type, disabled}) =>
    disabled
      ? theme.colors.greyLight100
      : type === 'primary'
      ? theme.colors.white
      : type === 'linkHighlight'
      ? theme.colors.greyLight250
      : type === 'outlineDanger'
      ? theme.colors.red
      : theme.colors.primary};
`;

export const ArrowRight = styled.Text`
  font-size: ${sizeDynamic(TEXT_SIZE_MEDIUM_DEFAULT)}px;
  color: ${({theme}) => theme.colors.white};
  margin-left: 8px;
  margin-top: 2px;
`;
