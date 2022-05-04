import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {FlatList} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashMessageContext} from '../../../../contexts';

import {Button, Header} from '../../../../components';
import CompanyService from '../../../../services/company';
import {maskCPFeCNPJ} from '../../../../utils/Masks';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  Actions,
  ButtonFloating,
  Container,
  ContainerItem,
  DescriptionEmpty,
  Floating,
  Group,
  Key,
  ListEmpty,
  Value,
} from './styles';

const Company: React.FC = () => {
  const {navigate} = useNavigation<NativeStackNavigationProp<any, any>>();
  const {showMessage} = useContext(FlashMessageContext);
  const [companies, setCompanies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const data: any = await CompanyService.get();
        setCompanies(data);
      })();
    }, []),
  );

  const showAlert = useCallback(
    (message: string, description: string, type: 'danger' | 'success') => {
      showMessage({
        message,
        description,
        type: type,
        icon: type,
      });
    },
    [showMessage],
  );

  async function remove(id: string) {
    try {
      await CompanyService.removeById(id);
      setCompanies(companies.filter((item: any) => item.id !== id));
      showAlert('Exclulído', 'Cadastro excluído com sucesso!', 'success');
    } catch (err: any) {}
  }

  const Item = ({register}: any) => {
    return (
      <ContainerItem>
        <Group>
          <Key>Razão Social: </Key>
          <Value>{register.item.name}</Value>
        </Group>
        <Group>
          <Key>Nome Fantasia: </Key>
          <Value>{register.item.fantasyName}</Value>
        </Group>
        <Group>
          <Key>CNPJ: </Key>
          <Value>{maskCPFeCNPJ(register.item.document)}</Value>
        </Group>
        <Actions>
          <Button
            width={49}
            height={40}
            text="excluir"
            type="outlineDanger"
            onPress={async () => await remove(register.item.id)}
          />
          <Button
            width={49}
            height={40}
            text="alterar"
            type="primary"
            onPress={() => navigate('FormCompany', {...register})}
          />
        </Actions>
      </ContainerItem>
    );
  };

  return (
    <Container>
      <Header title="Empresas parceira" headerWithBack />

      <Floating>
        <ButtonFloating onPress={() => navigate('FormCompany')}>
          <AntDesign name={'plus'} size={20} color={'#fff'} />
        </ButtonFloating>
      </Floating>

      <FlatList
        data={companies}
        keyExtractor={(item: any) => item.id}
        renderItem={(item: any) => <Item register={item} />}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          <ListEmpty>
            <DescriptionEmpty>
              Nenhuma empresa{'\n'}cadastrada.
            </DescriptionEmpty>
          </ListEmpty>
        }
      />
    </Container>
  );
};

export default Company;
