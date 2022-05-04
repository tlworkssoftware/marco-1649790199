import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Header, Input, PickerSelect} from '../../../components';
import {FlashMessageContext} from '../../../contexts';
import NF from '../../../services/nf';

import {maskCurrencyReal, maskDate} from '../../../utils/Masks';
import {setErrorForm} from '../../../utils/HandleError';
import {Container, ContainerForm} from './styles';

type RegisterFormParams = {
  company: string;
  value: string;
  number: number;
  description: string;
  month: number;
  receiptDate: string;
};

const months = [
  {label: '01', value: '1'},
  {label: '02', value: '2'},
  {label: '03', value: '3'},
  {label: '04', value: '4'},
  {label: '05', value: '5'},
  {label: '06', value: '6'},
  {label: '07', value: '7'},
  {label: '08', value: '8'},
  {label: '09', value: '9'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
];

const FormNF: React.FC = () => {
  const {goBack} = useNavigation<NativeStackNavigationProp<any, any>>();
  const formRef: MutableRefObject<any> = useRef(null);
  const filterRef: MutableRefObject<any> = useRef(null);
  const {showMessage} = useContext(FlashMessageContext);
  const route: any = useRoute();
  const [selectedMonth, setSelectedMonth] = useState(
    String(route?.params?.item?.month),
  );
  const [selectedCompany, setSelectedCompany] = useState<any>(
    route?.params?.item?.company.id,
  );

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
      data.month = Number(selectedMonth);

      const schema = Yup.object().shape({
        value: Yup.string().required(),
        number: Yup.string().required(),
        description: Yup.string().required(),
        month: Yup.string().required(),
        receiptDate: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const dateReceipt = new Date(
        Number(data.receiptDate.substr(6, 4)),
        Number(data.receiptDate.substr(3, 2)) - 1,
        Number(data.receiptDate.substr(0, 2)),
      );

      if (new Date() >= dateReceipt) {
        showAlert(
          'Atenção',
          'Data do recebimento deve ser maior ou igual a hoje!',
          'warning',
        );
        return;
      }

      if (route?.params?.item?.id) {
        await NF.update(
          route?.params?.item.id,
          JSON.stringify({id: selectedCompany.id, name: selectedCompany.title}),
          data.value,
          Number(data.number),
          data.description,
          Number(data.month),
          dateReceipt,
        );

        showAlert('Atualizado', 'Cadastro atualizado com sucesso!', 'success');
      } else {
        await NF.create(
          JSON.stringify({id: selectedCompany.id, name: selectedCompany.title}),
          data.value,
          Number(data.number),
          data.description,
          Number(data.month),
          dateReceipt,
        );

        showAlert('Cadastrado', 'Cadastro finalizado com sucesso!', 'success');
      }

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

  return (
    <Container>
      <Header title="Dados da Nota Fiscal" headerWithBack />

      <ContainerForm>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            value: route?.params?.item?.value,
            number: route?.params?.item?.number,
            description: route?.params?.item?.description,
            month: String(route?.params?.item?.month),
            receiptDate: route?.params?.item?.receiptDate,
          }}>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            initialValue={{id: route?.params?.item?.company.id}}
            emptyResultText="Nenhuma empresa cadastrada"
            onSelectItem={setSelectedCompany}
            dataSet={route?.params?.companies}
            inputHeight={50}
            rightButtonsContainerStyle={{
              backgroundColor: '#fff',
            }}
            containerStyle={{
              backgroundColor: '#fff',
              borderRadius: 8,
              borderWidth: 0.5,
              borderTopColor: '#D9D9D9',
              borderBottomColor: '#D9D9D9',
              borderLeftColor: '#D9D9D9',
              borderRightColor: '#D9D9D9',
              marginBottom: 16,
            }}
            textInputProps={{
              placeholder: 'Selecione uma empresa parceira',
              autoCorrect: false,
              autoCapitalize: 'none',
              style: {
                backgroundColor: 'transparent',
                color: '#5D5D5D',
                paddingLeft: 14,
              },
            }}
          />
          <Input
            name="value"
            placeholder="Valor da nota"
            keyboardType="phone-pad"
            onChange={e =>
              handleMask('value', e.nativeEvent.text, maskCurrencyReal)
            }
            defaultValue={maskCurrencyReal(String(route?.params?.item?.value))}
          />
          <Input
            name="number"
            placeholder="Número"
            keyboardType="phone-pad"
            defaultValue={String(route?.params?.item?.number || '')}
          />
          <Input
            name="description"
            placeholder="Descrição"
            keyboardType="default"
            autoCapitalize="sentences"
            defaultValue={route?.params?.item?.description}
          />
          <PickerSelect
            name="month"
            placeholder="Mês de competência..."
            items={months}
            ref={filterRef}
            input={selectedMonth}
            onChange={e => {
              setSelectedMonth(e);
            }}
            borderRadius
          />
          <Input
            name="receiptDate"
            placeholder="Data de recebimento"
            keyboardType="number-pad"
            maxLength={10}
            onChange={e =>
              handleMask('receiptDate', e.nativeEvent.text, maskDate)
            }
            defaultValue={route?.params?.item?.receiptDate}
          />
          <Button
            text="salvar"
            type="primary"
            onPress={() => formRef.current.submitForm()}
            style={{marginBottom: 130}}
          />
        </Form>
      </ContainerForm>
    </Container>
  );
};

export default FormNF;
