import React, {forwardRef, useContext, useEffect} from 'react';
import {ThemeContext} from 'styled-components';
import RNPickerSelect from 'react-native-picker-select';
import {useField} from '@unform/core';

type Items = {
  label: string;
  value: string;
};

interface PickerSelectProps {
  items: Items[];
  name: string;
  placeholder: string;
  onChange?: (e: any) => void;
  ref: any;
  input?: any;
  disabled?: boolean;
  borderRadius?: boolean;
}

const PickerSelect: React.FC<PickerSelectProps> = forwardRef(
  (
    {items, name, placeholder, onChange, input, disabled, borderRadius = false},
    ref: any,
  ) => {
    const theme = useContext(ThemeContext);
    const {fieldName, registerField, error} = useField(name);

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: ref.current,
        getValue() {
          if (ref.current) {
            return ref.current;
          }
          return '';
        },
        setValue(reference: any, value) {
          if (reference.current) {
            reference.current = value;
          }
        },
        clearValue() {
          if (ref.current) {
            ref.current = '';
          }
        },
      });
    }, [ref, fieldName, registerField]);

    return (
      <RNPickerSelect
        style={{
          inputIOS: {
            borderColor: error ? theme.colors.red : theme.colors.greyLight150,
            borderWidth: 1,
            height: 52,
            padding: 14,
            color: theme.colors.greyLight200,
            fontSize: 16,
            borderRadius: borderRadius ? 8 : 0,
            fontFamily: theme.fonts.regular,
            marginBottom: 8,
            backgroundColor: theme.colors.white,
          },
          inputAndroid: {
            borderColor: error ? theme.colors.red : theme.colors.greyLight150,
            borderWidth: 1,
            height: 52,
            borderRadius: borderRadius ? 8 : 0,
            padding: 14,
            color: theme.colors.greyLight200,
            fontSize: 16,
            fontFamily: theme.fonts.regular,
            marginBottom: 8,
            backgroundColor: theme.colors.white,
          },
        }}
        placeholder={{label: placeholder, value: null}}
        onValueChange={(value: any) => {
          ref.current = value;
          if (onChange) {
            onChange(value);
          }
        }}
        useNativeAndroidPickerStyle={false}
        items={items}
        value={input}
        disabled={disabled}
      />
    );
  },
);

export default PickerSelect;
