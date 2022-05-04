import React, {
  MutableRefObject,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';
import {Button, Input} from '../../../../components';
import {Container} from './styles';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {setErrorForm} from '../../../../utils/HandleError';
import {AuthContext, FlashMessageContext} from '../../../../contexts';

type LoginFormParams = {
  email: string;
  pass: string;
};

const Login: React.FC = () => {
  const formRef: MutableRefObject<any> = useRef(null);
  const {showMessage} = useContext(FlashMessageContext);
  const {signIn, isAuthenticated} = useContext(AuthContext);
  const {navigate} = useNavigation<NativeStackNavigationProp<any, any>>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('Home');
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(data: LoginFormParams) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        pass: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {email, pass} = formRef.current.getData();

      await signIn(email, pass);
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

  const getValidation = useCallback((_: string) => {
    const {email, pass} = formRef.current.getData();
    if (!!email && !!pass) {
      setDisabled(false);
      return;
    }

    setDisabled(true);
    return;
  }, []);

  return (
    <>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={getValidation}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            name="pass"
            placeholder="Senha"
            secureTextEntry
            onChangeText={getValidation}
          />

          <Button
            text="Entrar"
            type="primary"
            onPress={() => formRef.current.submitForm()}
            disabled={disabled}
          />
        </Form>
      </Container>
    </>
  );
};

export default Login;
