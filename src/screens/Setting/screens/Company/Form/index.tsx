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
import Company from '../../../../../services/company';

import {maskCPFeCNPJ, maskNumber} from '../../../../../utils/Masks';
import {setErrorForm} from '../../../../../utils/HandleError';
import {Container, ContainerForm} from './styles';

type RegisterFormParams = {
  name: string;
  fantasyName: string;
  document: string;
};

const FormCompany: React.FC = () => {
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

  const handleMask = useCallback(
    (field: string, value: string, callback: any) => {
      formRef.current.setFieldValue(field, callback(value));
      getValidation();
    },
    [],
  );

  function getValidation() {
    const data = formRef.current?.getData();
    if (data) {
      const {name, fantasyName, document} = data;

      if (!!name && !!fantasyName && !!document && !(document.length < 18)) {
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
        fantasyName: Yup.string().required(),
        document: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (route?.params?.item.id) {
        await Company.update(
          route?.params?.item.id,
          String(maskNumber(data.document)),
          data.name,
          data.fantasyName,
        );

        showAlert('Atualizado', 'Cadastro atualizado com sucesso!', 'success');
      } else {
        await Company.create(
          String(maskNumber(data.document)),
          data.name,
          data.fantasyName,
        );

        showAlert('Cadastrado', 'Cadastro finalizado com sucesso!', 'success');
      }

      formRef.current.reset();

      navigate('Company');
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
      <Header title="Dados da empresa" headerWithBack />

      <ContainerForm>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: route?.params?.item.name,
            fantasyName: route?.params?.item.fantasyName,
            document: maskCPFeCNPJ(route?.params?.item.document),
          }}>
          <Input
            name="name"
            placeholder="Nome da empresa"
            onChangeText={getValidation}
            autoCapitalize="characters"
            autoComplete="off"
            defaultValue={route?.params?.item.name}
          />
          <Input
            name="document"
            placeholder="CNPJ"
            keyboardType="phone-pad"
            onChange={e =>
              handleMask('document', e.nativeEvent.text, maskCPFeCNPJ)
            }
            maxLength={18}
            defaultValue={maskCPFeCNPJ(route?.params?.item.document)}
          />
          <Input
            name="fantasyName"
            placeholder="Nome fantasia"
            onChangeText={getValidation}
            autoCapitalize="characters"
            autoComplete="off"
            defaultValue={route?.params?.item.fantasyName}
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

export default FormCompany;
