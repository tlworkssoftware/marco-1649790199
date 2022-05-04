import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {FlatList} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashMessageContext} from '../../contexts';

import {Button, Header} from '../../components';
import NFService from '../../services/nf';
import Company from '../../services/company';
import {maskCurrencyReal} from '../../utils/Masks';
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

const NF: React.FC = () => {
  const {navigate} = useNavigation<NativeStackNavigationProp<any, any>>();
  const {showMessage} = useContext(FlashMessageContext);
  const [companies, setCompanies] = useState([]);
  const [nfs, setNFs] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const companiesData: any = await Company.get();
        setCompanies(
          companiesData.map((item: any) => ({
            id: item.id,
            title: item.fantasyName,
          })),
        );

        const nfsData: any = await NFService.get();
        setNFs(nfsData);
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
      await NFService.removeById(id);
      setNFs(nfs.filter((item: any) => item.id !== id));
      showAlert('Exclulído', 'Cadastro excluído com sucesso!', 'success');
    } catch (err: any) {}
  }

  const Item = ({register}: any) => {
    return (
      <ContainerItem>
        <Group>
          <Key>Número: </Key>
          <Value>{register.item.number}</Value>
        </Group>
        <Group>
          <Key>Valor: </Key>
          <Value>{maskCurrencyReal(register.item.value)}</Value>
        </Group>
        <Group>
          <Key>Competência: </Key>
          <Value>{String(register.item.month).padStart(2, '0')}</Value>
        </Group>
        <Group>
          <Key>Recebimento: </Key>
          <Value>{register.item.receiptDate}</Value>
        </Group>
        <Group>
          <Key>Empresa: </Key>
          <Value>{register.item?.company?.name}</Value>
        </Group>
        <Group>
          <Key>Descrição: </Key>
          <Value>{register.item.description}</Value>
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
            onPress={() => navigate('FormNF', {...register, companies})}
          />
        </Actions>
      </ContainerItem>
    );
  };

  return (
    <Container>
      <Header title="Notas Fiscais" headerWithBack />

      <Floating>
        <ButtonFloating onPress={() => navigate('FormNF', {companies})}>
          <AntDesign name={'plus'} size={20} color={'#fff'} />
        </ButtonFloating>
      </Floating>

      <FlatList
        data={nfs}
        keyExtractor={(item: any) => item.id}
        renderItem={(item: any) => <Item register={item} />}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          <ListEmpty>
            <DescriptionEmpty>
              Nenhuma nota fiscal{'\n'}cadastrada.
            </DescriptionEmpty>
          </ListEmpty>
        }
      />
    </Container>
  );
};

export default NF;
