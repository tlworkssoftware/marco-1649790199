import styled from 'styled-components/native';
import {sizeDynamic} from '../../styles/config';

export const Container = styled.View`
  flex: 1;
`;

export const CardChartTitle = styled.Text<{small?: boolean}>`
  align-self: center;
  font-size: ${({small}) => (small ? sizeDynamic(11) : sizeDynamic(15))}px;
  color: ${({theme, small}) =>
    small ? theme.colors.greyLight100 : theme.colors.greyLight250};
  font-weight: ${({small}) => (small ? 400 : 700)};
`;

export const CardChart = styled.View`
  padding: 20px 10px;
  background: white;
  margin-bottom: 10px;
`;

export const Legends = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Badge = styled.View<{color: string}>`
  background: ${({color}) => color};
  width: 10px;
  height: 10px;
  margin-right: 5px;
`;

export const Legend = styled.Text`
  font-size: ${sizeDynamic(12)}px;
  color: ${({theme}) => theme.colors.greyLight250};
`;
