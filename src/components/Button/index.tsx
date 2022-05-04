import React, {useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import {ThemeContext} from 'styled-components';

import {ArrowRight, TextCustom, TouchableOpacityCustom} from './styles';

export interface ButtonProps {
  text: string;
  type: 'primary' | 'outline' | 'link' | 'linkHighlight' | 'outlineDanger';
  width?: number;
  height?: number;
  arrowRight?: boolean;
  style?: any;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  arrowRight,
  disabled,
  loading,
  width = 100,
  height = 52,
  ...rest
}) => {
  const theme = useContext(ThemeContext);

  return (
    <TouchableOpacityCustom
      width={width}
      height={height}
      disabled={disabled || loading}
      {...rest}>
      {!loading && (
        <>
          <TextCustom type={rest.type} disabled={disabled || loading || false}>
            {text}
          </TextCustom>

          {arrowRight && <ArrowRight>→</ArrowRight>}
        </>
      )}
      {loading && (
        <ActivityIndicator
          size="small"
          color={
            rest.type === 'primary'
              ? theme.colors.greyLight100
              : rest.type === 'outlineDanger'
              ? theme.colors.red
              : theme.colors.primary
          }
        />
      )}
    </TouchableOpacityCustom>
  );
};

export default Button;
