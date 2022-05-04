import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Header} from '../../components';

import arrowRight from '../../assets/icons/arrowRight';
import {Container, Group, ListItem, ListItemText} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import User from '../../services/user';

const Setting: React.FC = () => {
  const {navigate} = useNavigation<NativeStackNavigationProp<any, any>>();

  return (
    <>
      <Header title="Preferências" />
      <Container>
        <ListItem onPress={() => navigate('Company')} last={false}>
          <Group>
            <AntDesign name={'home'} size={20} color={'#5D5D5D'} />
            <ListItemText>Empresas parceiras</ListItemText>
          </Group>
          <SvgXml xml={arrowRight} width={13} height={13} />
        </ListItem>
        <ListItem onPress={() => navigate('Category')} last={false}>
          <Group>
            <AntDesign name={'addfolder'} size={20} color={'#5D5D5D'} />
            <ListItemText>Categorias</ListItemText>
          </Group>
          <SvgXml xml={arrowRight} width={13} height={13} />
        </ListItem>
        <ListItem onPress={() => navigate('Configs')} last={false}>
          <Group>
            <AntDesign name={'setting'} size={20} color={'#5D5D5D'} />
            <ListItemText>Configurações do sistema</ListItemText>
          </Group>
          <SvgXml xml={arrowRight} width={13} height={13} />
        </ListItem>
        <ListItem
          onPress={() => {
            User.updateRemember(false);
            navigate('Welcome');
          }}
          last={true}>
          <Group>
            <AntDesign name={'logout'} size={20} color={'#5D5D5D'} />
            <ListItemText>Sair</ListItemText>
          </Group>
        </ListItem>
      </Container>
    </>
  );
};

export default Setting;
