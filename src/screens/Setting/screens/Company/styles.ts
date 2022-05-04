import styled from 'styled-components/native';
import {sizeDynamic, TEXT_SIZE_MEDIUM_DEFAULT} from '../../../../styles/config';

export const Container = styled.View`
  flex: 1;
  background: ${({theme}) => theme.colors.background};
  height: 100%;
`;

export const ContainerItem = styled.View`
  padding: 25px;
  background: ${({theme}) => theme.colors.white};
  margin-bottom: 8px;
`;

export const Group = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

export const Key = styled.Text`
  font-size: ${sizeDynamic(TEXT_SIZE_MEDIUM_DEFAULT)}px;
  color: ${({theme}) => theme.colors.greyLight200};
  font-family: ${({theme}) => theme.fonts.medium};
`;

export const Value = styled.Text`
  font-size: ${sizeDynamic(TEXT_SIZE_MEDIUM_DEFAULT)}px;
  color: ${({theme}) => theme.colors.greyLight250};
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const Actions = styled.View`
  margin-top: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ListEmpty = styled.View`
  padding-top: 20%;
  justify-content: center;
  align-items: center;
`;

export const DescriptionEmpty = styled.Text`
  font-size: ${sizeDynamic(TEXT_SIZE_MEDIUM_DEFAULT)}px;
  color: ${({theme}) => theme.colors.greyLight250};
  font-family: ${({theme}) => theme.fonts.regular};
  text-align: center;
`;

export const Floating = styled.View`
  position: absolute;
  bottom: 4%;
  width: 100%;
  left: 43%;
  z-index: 2;
`;

export const ButtonFloating = styled.TouchableOpacity`
  background: ${({theme}) => theme.colors.primary};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
