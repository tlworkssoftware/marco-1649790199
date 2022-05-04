import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Button, Input, ValidatePassword} from '../../../../components';
import {setErrorForm} from '../../../../utils/HandleError';
import {
  maskCPFeCNPJ,
  maskNumber,
  maskPhoneNumber,
} from '../../../../utils/Masks';

import {ScrollViewCustom, Container} from './styles';
import {FlashMessageContext} from '../../../../contexts';
import User from '../../../../services/user';
type RegisterFormParams = {
  email: string;
  fullname: string;
  document: string;
  companyName: string;
  phone: string;
  pass: string;
  passConfirm: string;
};

const Register: React.FC = () => {
  const {showMessage} = useContext(FlashMessageContext);
  const [disabled, setDisabled] = useState<boolean>(true);
  const {navigate} = useNavigation<NativeStackNavigationProp<any, any>>();
  const formRef: MutableRefObject<any> = useRef(null);
  const [messagePass, setMessagePass] = useState<any>({
    longLetter: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  function checkPass(value: string) {
    const type = {
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      number: /[0-9]/,
    };

    let checkResult = {
      longLetter: false,
      uppercase: false,
      lowercase: false,
      number: false,
    };

    if (value.length > 7) {
      checkResult.longLetter = true;
    }

    if (type.uppercase.test(value)) {
      checkResult.uppercase = true;
    }

    if (type.lowercase.test(value)) {
      checkResult.lowercase = true;
    }

    if (type.number.test(value)) {
      checkResult.number = true;
    }

    return setMessagePass({
      ...checkResult,
    });
  }

  function getValidation() {
    const data = formRef.current?.getData();

    if (data) {
      const {email, fullname, document, companyName, phone, pass, passConfirm} =
        data;

      if (pass) {
        checkPass(pass);
      } else {
        setMessagePass({
          longLetter: false,
          uppercase: false,
          lowercase: false,
          number: false,
        });
      }

      if (
        !!email &&
        !!fullname &&
        !!document &&
        !(document.length < 18) &&
        !!phone &&
        !(phone.length < 15) &&
        !!pass &&
        !!passConfirm &&
        messagePass.longLetter &&
        messagePass.uppercase &&
        messagePass.lowercase &&
        messagePass.number
      ) {
        setDisabled(false);
        return;
      }
      setDisabled(true);
      return;
    }

    return;
  }

  const handleMask = useCallback(
    (field: string, value: string, callback: any) => {
      formRef.current.setFieldValue(field, callback(value));
      getValidation();
    },
    [],
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

  async function handleSubmit(data: RegisterFormParams) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        fullname: Yup.string().required(),
        document: Yup.string().required(),
        companyName: Yup.string().required(),
        phone: Yup.string().required(),
        pass: Yup.string()
          .required()
          .min(6)
          .oneOf([Yup.ref('passConfirm'), null], 'As senhas não são iguais!'),
        passConfirm: Yup.string()
          .required()
          .min(6)
          .oneOf([Yup.ref('pass'), null], 'As senhas não são iguais!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await User.create(
        data.email,
        data.fullname,
        maskNumber(data.document),
        data.companyName,
        maskNumber(data.phone),
        data.pass,
      );

      showAlert('Parabéns', 'Cadastro finalizado com sucesso!', 'success');

      formRef.current.reset();

      navigate('Welcome', {screen: 'Login'});
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
    <>
      <ScrollViewCustom showsVerticalScrollIndicator={false}>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={getValidation}
              autoCapitalize="none"
              autoComplete="off"
            />
            <Input
              name="fullname"
              placeholder="Nome Completo"
              onChangeText={getValidation}
              autoCapitalize="words"
              autoComplete="off"
            />
            <Input
              name="document"
              placeholder="CNPJ"
              keyboardType="phone-pad"
              onChange={e =>
                handleMask('document', e.nativeEvent.text, maskCPFeCNPJ)
              }
              maxLength={18}
            />
            <Input
              name="companyName"
              placeholder="Nome da Empresa"
              onChangeText={getValidation}
              autoCapitalize="characters"
              autoComplete="off"
            />
            <Input
              name="phone"
              placeholder="Celular com DDD"
              keyboardType="phone-pad"
              onChange={e =>
                handleMask('phone', e.nativeEvent.text, maskPhoneNumber)
              }
              maxLength={15}
            />
            <Input
              name="pass"
              placeholder="Senha"
              secureTextEntry
              onChangeText={getValidation}
            />
            <Input
              name="passConfirm"
              placeholder="Confirmar senha"
              secureTextEntry
              onChangeText={getValidation}
            />

            <ValidatePassword messagePass={messagePass} />

            <Button
              text="salvar"
              type="primary"
              onPress={() => formRef.current.submitForm()}
              style={{marginBottom: 130}}
              disabled={disabled}
            />
          </Form>
        </Container>
      </ScrollViewCustom>
    </>
  );
};

export default Register;
