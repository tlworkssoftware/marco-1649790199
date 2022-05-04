import {sizeDynamic, TEXT_SIZE_REGULAR_DEFAULT} from '../../styles/config';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  margin-bottom: 14px;
  width: 100%;
`;

export const Label = styled.Text<{error?: string; color?: string}>`
  position: absolute;
  font-size: ${sizeDynamic(10)}px;
  top: -7px;
  left: 14px;
  z-index: 2;
  padding: 0px 5px;

  ${({theme, error, color}) => css`
    background-color: ${theme.colors.white};
    color: ${color
      ? color
      : error
      ? theme.colors.red
      : theme.colors.greyLight100};
    font-family: ${theme.fonts.regular};
  `}
`;

export const TextInputCustom = styled.TextInput<{
  error?: string;
  borderColor?: string;
  height?: number;
}>`
  border-radius: 8px;
  padding: 11px;
  padding-left: 14px;
  font-size: ${sizeDynamic(TEXT_SIZE_REGULAR_DEFAULT)}px;
  background-color: white;

  ${({theme, error, height, borderColor}) => css`
    border-color: ${borderColor
      ? borderColor
      : error
      ? theme.colors.red
      : theme.colors.greyLight150};
    border-width: ${borderColor || error ? 1 : 0.5}px;
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.greyLight200};
    height: ${height ? height : 52}px;
  `}
`;

export const LabelError = styled.Text<{error?: string; color?: string}>`
  font-size: ${sizeDynamic(10)}px;
  padding: 0px 5px;
  margin-top: 5px;
  ${({theme, error, color}) => css`
    background-color: ${theme.colors.white};
    color: ${color
      ? color
      : error
      ? theme.colors.red
      : theme.colors.greyLight100};
    font-family: ${theme.fonts.regular};
  `};
`;
