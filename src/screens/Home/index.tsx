import React, {MutableRefObject, useRef} from 'react';

import {
  PieChart,
  BarChart,
  Grid,
  StackedBarChart,
} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';

import {Header, PickerSelect} from '../../components';

import {
  Badge,
  CardChart,
  CardChartTitle,
  Legend,
  LegendItem,
  Legends,
} from './styles';
import {maskCurrencyReal} from '../../utils/Masks';
import {ScrollView} from 'react-native';
import {Form} from '@unform/mobile';

const Home: React.FC = () => {
  const dataFatLegend = ['Pendentes', 'Emitidos'];
  const dataFatValue = [50000, 183220];
  const dataFatColor = ['#ae2727', '#208205'];
  const dataFat = dataFatValue.map((value, index) => ({
    value,
    key: `${value}-${index}`,
    svg: {
      fill: dataFatColor[index],
    },
    label: dataFatLegend[index],
  }));

  const dataBalanceLegends = ['Receita', 'Despesa'];
  const dataBalanceColors = ['#208205', '#ae2727'];
  const dataBalance = [
    {
      month: new Date(2022, 0, 1),
      receita: 7840,
      despesa: 920,
    },
    {
      month: new Date(2022, 1, 1),
      receita: 3840,
      despesa: 2920,
    },
    {
      month: new Date(2022, 2, 1),
      receita: 1840,
      despesa: 9920,
    },
    {
      month: new Date(2022, 3, 1),
      receita: 500,
      despesa: 9920,
    },
  ];

  const dataBalanceLegend = dataBalanceColors.map((value, index) => ({
    value,
    key: `${value}-${index}`,
    svg: {
      fill: dataBalanceColors[index],
    },
    label: dataBalanceLegends[index],
  }));

  const dataCategoryLegend = [
    'Alimentação',
    'Aluguel',
    'Impostos',
    'Faxineira',
  ];
  const dataCategoryValue = [50000, 18320, 20000, 30000];
  const dataCategoryColor = ['#aaa', '#208205', '#2140c7', '#ef6537'];
  const dataCategory = dataCategoryValue.map((value, index) => ({
    value,
    key: `${value}-${index}`,
    svg: {
      fill: dataCategoryColor[index],
    },
    label: dataCategoryLegend[index],
  }));

  return (
    <>
      <Header title="Home" />

      <Filter />

      <ScrollView>
        <CardChart>
          <CardChartTitle>Faturamento para emitir</CardChartTitle>
          <CardChartTitle small>(Desemquadramento como MEI)</CardChartTitle>

          <PieChart style={{height: 200, marginTop: 30}} data={dataFat}>
            <LabelPieChart />
          </PieChart>

          <Legends>
            {dataFat.map((item, i) => (
              <LegendItem key={i}>
                <Badge color={item.svg.fill} />
                <Legend>{item.label}</Legend>
              </LegendItem>
            ))}
          </Legends>
        </CardChart>

        <CardChart>
          <CardChartTitle>NFs-e gerado</CardChartTitle>
          <CardChartTitle small>(mês a mês)</CardChartTitle>

          <BarChart
            style={{height: 200, marginTop: 30}}
            data={[40, 30, 25, 10]}
            svg={{fill: '#379AEF'}}
            contentInset={{bottom: 30}}>
            <Grid direction={Grid.Direction.HORIZONTAL} />
            <LabelBarChart />
          </BarChart>
        </CardChart>

        <CardChart>
          <CardChartTitle>Despesas</CardChartTitle>
          <CardChartTitle small>(mês a mês)</CardChartTitle>

          <BarChart
            style={{height: 200, marginTop: 30}}
            data={[3, 30, 140, 12]}
            svg={{fill: '#ef6537'}}
            contentInset={{bottom: 30}}>
            <Grid direction={Grid.Direction.HORIZONTAL} />
            <LabelBarChart />
          </BarChart>
        </CardChart>

        <CardChart>
          <CardChartTitle>Receitas x Despesas</CardChartTitle>
          <CardChartTitle small>(mês a mês)</CardChartTitle>

          <StackedBarChart
            style={{height: 200, marginTop: 30}}
            keys={['receita', 'despesa']}
            colors={dataBalanceColors}
            data={dataBalance}
            showGrid={false}
            contentInset={{top: 30, bottom: 30}}
          />

          <Legends>
            {dataBalanceLegend.map((item, i) => (
              <LegendItem key={i}>
                <Badge color={item.svg.fill} />
                <Legend>{item.label}</Legend>
              </LegendItem>
            ))}
          </Legends>
        </CardChart>

        <CardChart>
          <CardChartTitle>Despesas</CardChartTitle>
          <CardChartTitle small>(por categorias)</CardChartTitle>

          <PieChart style={{height: 200, marginTop: 30}} data={dataCategory}>
            <LabelPieChart />
          </PieChart>

          <Legends>
            {dataCategory.map((item, i) => (
              <LegendItem key={i}>
                <Badge color={item.svg.fill} />
                <Legend>{item.label}</Legend>
              </LegendItem>
            ))}
          </Legends>
        </CardChart>
      </ScrollView>
    </>
  );
};

const Filter = () => {
  const formRef: MutableRefObject<any> = useRef(null);
  const filterRef: MutableRefObject<any> = useRef(null);

  return (
    <Form ref={formRef} onSubmit={() => {}}>
      <PickerSelect
        name="year"
        placeholder="Filtar pelo ano..."
        ref={filterRef}
        items={[
          {label: '2022', value: '2022'},
          {label: '2021', value: '2021'},
          {label: '2020', value: '2020'},
          {label: '2019', value: '2019'},
          {label: '2018', value: '2018'},
          {label: '2017', value: '2017'},
        ]}
        onChange={() => {}}
      />
    </Form>
  );
};

const LabelBarChart = ({x, y, bandwidth, data}: any) =>
  data.map((value: any, index: any) => (
    <Text
      key={index}
      x={x(index) + bandwidth / 2}
      y={value < 20 ? y(value) - 10 : y(value) + 15}
      fontSize={14}
      fill={value >= 20 ? 'white' : 'black'}
      alignmentBaseline={'middle'}
      textAnchor={'middle'}>
      {value}
    </Text>
  ));

const LabelPieChart = ({slices}: any) => {
  return slices.map((slice: any, index: number) => {
    const {pieCentroid, data} = slice;
    return (
      <Text
        key={`label-${index}`}
        x={pieCentroid[0]}
        y={pieCentroid[1]}
        fill="#fff"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={11}
        fontStyle={'oblique'}>
        {maskCurrencyReal(String(data.value))}
      </Text>
    );
  });
};

export default Home;
