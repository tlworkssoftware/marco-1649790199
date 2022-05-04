import React from 'react';
import {SvgXml} from 'react-native-svg';

import uncheck from '../../assets/icons/uncheck';
import check from '../../assets/icons/check';

import {ValidationPassWrapper, MessageWrapper, Description} from './styles';

type PasswordProps = {
  messagePass: {
    longLetter: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
  };
};

const ValidatePassword: React.FC<PasswordProps> = ({messagePass}) => {
  return (
    <ValidationPassWrapper>
      <MessageWrapper>
        <SvgXml xml={messagePass.longLetter ? check : uncheck} />
        <Description>Pelo menos 8 caracteres</Description>
      </MessageWrapper>
      <MessageWrapper>
        <SvgXml xml={messagePass.uppercase ? check : uncheck} />
        <Description>Contém letra maiúscula (A-Z)</Description>
      </MessageWrapper>
      <MessageWrapper>
        <SvgXml xml={messagePass.lowercase ? check : uncheck} />
        <Description>Contém letra minúscula (a-z)</Description>
      </MessageWrapper>
      <MessageWrapper>
        <SvgXml xml={messagePass.number ? check : uncheck} />
        <Description>Contém número (0-9)</Description>
      </MessageWrapper>
    </ValidationPassWrapper>
  );
};

export default ValidatePassword;
