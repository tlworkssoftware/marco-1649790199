import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {useField} from '@unform/core';
import {TextInputProps} from 'react-native';
import {
  Container,
  Label,
  LabelError,
  TextInputCustom,
} from './styles';
import {ThemeContext} from 'styled-components';
interface InputProps extends TextInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  height?: number;
  onChangeText?: (value: string) => void;
  editable?: boolean;
  borderColor?: string | undefined;
  errorDescription?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  height,
  onChangeText,
  editable = true,
  borderColor = undefined,
  errorDescription = false,
  ...rest
}) => {
  const inputRef: MutableRefObject<any> = useRef(null);
  const {fieldName, registerField, defaultValue, error} = useField(name);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) {
          return inputRef.current.value;
        }
        return '';
      },
      setValue(ref: any, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({text: value});
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({text: ''});
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    text => {
      if (inputRef.current) {
        inputRef.current.value = text;
      }
      if (onChangeText) {
        onChangeText(text);
      }
    },
    [onChangeText],
  );

  return (
    <Container>
      {label && (
        <Label error={error} color={borderColor}>
          {label}
        </Label>
      )}
      <TextInputCustom
        height={height}
        borderColor={borderColor}
        error={error}
        ref={inputRef}
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        placeholderTextColor={
          error ? theme.colors.red : theme.colors.greyLight100
        }
        editable={editable}
        {...rest}
      />
      {errorDescription && (
        <LabelError error={error} color={borderColor}>
          {error}
        </LabelError>
      )}
    </Container>
  );
};

export default Input;
