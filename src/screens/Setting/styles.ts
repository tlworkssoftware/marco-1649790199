import styled, {css} from 'styled-components/native';
import {
  heightPercentageToDP,
  sizeDynamic,
  TEXT_SIZE_MEDIUM_DEFAULT,
} from '../../styles/config';

export const Container = styled.View`
  flex: 1;
`;

export const ListItemText = styled.Text`
  ${({theme}) => css`
    font-size: ${sizeDynamic(TEXT_SIZE_MEDIUM_DEFAULT)}px;
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.greyLight200};
    margin-left: ${heightPercentageToDP('1.2')}px;
  `}
`;

export const Group = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ListItem = styled.TouchableOpacity<{
  last: boolean;
}>`
  width: 100%;
  height: 67px;
  border-width: 0.7px;
  border-top-color: 0px;
  border-left-color: 0px;
  border-right-color: 0px;
  border-bottom-color: ${({theme, last}) =>
    last ? theme.colors.white : theme.colors.greyLight150};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.colors.white};
  padding: 14px;
`;
