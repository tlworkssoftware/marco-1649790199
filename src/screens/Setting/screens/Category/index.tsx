import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {FlatList} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashMessageContext} from '../../../../contexts';

import {Button, Header} from '../../../../components';
import CategoryService from '../../../../services/category';
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

const Category: React.FC = () => {
  const {navigate} = useNavigation<NativeStackNavigationProp<any, any>>();
  const {showMessage} = useContext(FlashMessageContext);
  const [categories, setCategories] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const data: any = await CategoryService.get();
        setCategories(data);
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

  async function updateStatus(id: string, active: boolean) {
    try {
      await CategoryService.updateStatus(id, active);
      const data: any = await CategoryService.get();
      setCategories(data);
      showAlert('Atualizado', 'Status atualizado com sucesso!', 'success');
    } catch (err: any) {}
  }

  const Item = ({register}: any) => {
    return (
      <ContainerItem>
        <Group>
          <Key>Nome: </Key>
          <Value>{register.item.name}</Value>
        </Group>
        <Group>
          <Key>Descrição: </Key>
          <Value>{register.item.description}</Value>
        </Group>
        <Group>
          <Key>status: </Key>
          <Value>{register.item.active ? 'ativo' : 'arquivado'}</Value>
        </Group>
        <Actions>
          <Button
            width={49}
            height={40}
            text={register.item.active ? 'arquivar' : 'ativar'}
            type="outlineDanger"
            onPress={async () =>
              await updateStatus(register.item.id, !register.item.active)
            }
          />
          <Button
            width={49}
            height={40}
            text="alterar"
            type="primary"
            onPress={() => navigate('FormCategory', {...register})}
          />
        </Actions>
      </ContainerItem>
    );
  };

  return (
    <Container>
      <Header title="Categorias" headerWithBack />

      <Floating>
        <ButtonFloating onPress={() => navigate('FormCategory')}>
          <AntDesign name={'plus'} size={20} color={'#fff'} />
        </ButtonFloating>
      </Floating>

      <FlatList
        data={categories}
        keyExtractor={(item: any) => item.id}
        renderItem={(item: any) => <Item register={item} />}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          <ListEmpty>
            <DescriptionEmpty>
              Nenhuma categoria{'\n'}cadastrada.
            </DescriptionEmpty>
          </ListEmpty>
        }
      />
    </Container>
  );
};

export default Category;
