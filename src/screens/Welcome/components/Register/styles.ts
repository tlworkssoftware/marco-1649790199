import styled from 'styled-components/native';

export const ScrollViewCustom = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
  padding: 26px;
`;
