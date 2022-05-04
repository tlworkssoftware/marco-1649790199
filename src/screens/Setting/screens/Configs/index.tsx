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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Header, Input, ToggleButton} from '../../../../components';
import {FlashMessageContext} from '../../../../contexts';
import Setting from '../../../../services/setting';

import {setErrorForm} from '../../../../utils/HandleError';
import {Container, ContainerForm, Group, Legend} from './styles';
import {maskCurrencyReal} from '../../../../utils/Masks';

type RegisterFormParams = {
  limitMei: string;
};

const Configs: React.FC = () => {
  const {goBack} = useNavigation<NativeStackNavigationProp<any, any>>();
  const formRef: MutableRefObject<any> = useRef(null);
  const {showMessage} = useContext(FlashMessageContext);
  const [isEnabledAlert, setIsEnabledAlert] = useState(false);
  const [isEnabledMail, setIsEnabledMail] = useState(false);
  const [isEnabledSMS, setIsEnabledSMS] = useState(false);
  const route: any = useRoute();

  const showAlert = useCallback(
    (
      message: string,
      description: string,
      type: 'danger' | 'success' | 'warning',
    ) => {
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
    },
    [],
  );

  async function handleSubmit(data: RegisterFormParams) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        limitMei: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await Setting.create(
        data.limitMei,
        isEnabledAlert,
        isEnabledMail,
        isEnabledSMS,
      );
      showAlert('Atualizado', 'Cadastro atualizado com sucesso!', 'success');

      formRef.current.reset();

      goBack();
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

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const data: any = await Setting.get();
        formRef.current.setFieldValue(
          'limitMei',
          maskCurrencyReal(data.limitMei),
        );
        setIsEnabledAlert(data.alertInvoice);
        setIsEnabledMail(data.sendMail);
        setIsEnabledSMS(data.sendSMS);
      })();
    }, []),
  );

  return (
    <Container>
      <Header title="Configurações" headerWithBack />

      <ContainerForm>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            limitMei: route?.params?.item.limitMei,
          }}>
          <Input
            name="limitMei"
            placeholder="Limite máximo anual de faturamento de MEI"
            autoComplete="off"
            keyboardType="number-pad"
            defaultValue={route?.params?.item.name}
            onChange={e =>
              handleMask('limitMei', e.nativeEvent.text, maskCurrencyReal)
            }
          />
          <Group>
            <Legend>Alertas sobre seu faturamento</Legend>
            <ToggleButton
              setIsEnabled={setIsEnabledAlert}
              isEnabled={isEnabledAlert}
            />
          </Group>
          <Group>
            <Legend>Envio notificação por e-mail</Legend>
            <ToggleButton
              setIsEnabled={setIsEnabledMail}
              isEnabled={isEnabledMail}
            />
          </Group>
          <Group>
            <Legend>Envio por SMS</Legend>
            <ToggleButton
              setIsEnabled={setIsEnabledSMS}
              isEnabled={isEnabledSMS}
            />
          </Group>

          <Button
            text="salvar"
            type="primary"
            onPress={() => formRef.current.submitForm()}
            style={{marginTop: 30}}
          />
        </Form>
      </ContainerForm>
    </Container>
  );
};

export default Configs;
