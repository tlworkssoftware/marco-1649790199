import styled from 'styled-components/native';

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
