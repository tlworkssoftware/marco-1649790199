import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Header, Input} from '../../../../../components';
import {FlashMessageContext} from '../../../../../contexts';
import Category from '../../../../../services/category';

import {setErrorForm} from '../../../../../utils/HandleError';
import {Container, ContainerForm} from './styles';

type RegisterFormParams = {
  name: string;
  description: string;
};

const FormCategory: React.FC = () => {
  const {navigate} = useNavigation<NativeStackNavigationProp<any, any>>();
  const formRef: MutableRefObject<any> = useRef(null);
  const {showMessage} = useContext(FlashMessageContext);
  const [disabled, setDisabled] = useState<boolean>(true);
  const route: any = useRoute();

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

  function getValidation() {
    const data = formRef.current?.getData();
    if (data) {
      const {name, description} = data;

      if (!!name && !!description) {
        setDisabled(false);
        return;
      }
      setDisabled(true);
      return;
    }

    return;
  }

  async function handleSubmit(data: RegisterFormParams) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (route?.params?.item.id) {
        await Category.update(
          route?.params?.item.id,
          data.name,
          data.description,
        );

        showAlert('Atualizado', 'Cadastro atualizado com sucesso!', 'success');
      } else {
        await Category.create(data.name, data.description);

        showAlert('Cadastrado', 'Cadastro finalizado com sucesso!', 'success');
      }

      formRef.current.reset();

      navigate('Category');
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        showAlert(
          'Campos obrigatórios!',
          'Confira os campos em vermelho...',
          'danger',
        );

        formRef.current.setErrors(setErrorForm(err));
        return;
      }

      showAlert('Atenção', err.message, 'danger');
    }
  }

  useLayoutEffect(() => {
    if (route?.params?.item.id) {
      setDisabled(false);
    }
  }, [route?.params?.item]);

  return (
    <Container>
      <Header title="Dados da categoria" headerWithBack />

      <ContainerForm>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: route?.params?.item.name,
            description: route?.params?.item.description,
          }}>
          <Input
            name="name"
            placeholder="Nome da categoria"
            onChangeText={getValidation}
            autoCapitalize="sentences"
            autoComplete="off"
            defaultValue={route?.params?.item.name}
          />
          <Input
            name="description"
            placeholder="Descrição"
            onChangeText={getValidation}
            autoCapitalize="sentences"
            autoComplete="off"
            defaultValue={route?.params?.item.description}
          />

          <Button
            text="salvar"
            type="primary"
            onPress={() => formRef.current.submitForm()}
            style={{marginBottom: 130}}
            disabled={disabled}
          />
        </Form>
      </ContainerForm>
    </Container>
  );
};

export default FormCategory;
