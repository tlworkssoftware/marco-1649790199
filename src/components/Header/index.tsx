import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SvgXml} from 'react-native-svg';
import {ThemeContext} from 'styled-components';

import IconArrowLeft from '../../assets/icons/arrowLeft';

import {Container, Wrapper, Button, TitlePage} from './styles';

interface HeaderChildrenProps {
  headerWithBack?: boolean;
  title: string;
  animated?: any;
}

const HeaderChildren: React.FC<HeaderChildrenProps> = ({
  headerWithBack,
  title,
}) => {
  const theme = React.useContext(ThemeContext);
  const {goBack} = useNavigation<NativeStackNavigationProp<any, any>>();

  return (
    <Container>
      {headerWithBack ? (
        <Wrapper>
          <Button onPress={() => goBack()}>
            <SvgXml
              xml={IconArrowLeft(theme.colors.white)}
              width="14"
              height="14"
            />
          </Button>

          <TitlePage>{title}</TitlePage>
        </Wrapper>
      ) : (
        <TitlePage>{title}</TitlePage>
      )}
    </Container>
  );
};

export default HeaderChildren;
