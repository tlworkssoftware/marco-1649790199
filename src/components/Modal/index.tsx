import React from 'react';

import close from '../../assets/icons/close';
import Button, {ButtonProps} from '../Button';
import {Close, CloseIcon, Body, Container, Title, Subtitle} from './styles';

type AttributesProps = {
  show: boolean;
  title?: string;
  subtitle?: string;
  buttons?: any;
};

export type ModalProps = {
  modalAttributes: AttributesProps;
  setModalAttributes: (e: any) => void;
};

const Modal: React.FC<ModalProps> = ({modalAttributes, setModalAttributes}) => {
  return (
    <Container>
      <Body>
        <Close
          onPress={() => setModalAttributes({...modalAttributes, show: false})}>
          <CloseIcon xml={close()} />
        </Close>

        <Title>{modalAttributes.title}</Title>
        <Subtitle>{modalAttributes.subtitle}</Subtitle>

        {modalAttributes.buttons.map((item: ButtonProps, i: number) => {
          return (
            <Button
              key={i}
              text={item.text}
              type={item.type}
              onPress={item.onPress}
              loading={item.loading}
            />
          );
        })}
      </Body>
    </Container>
  );
};

export default Modal;
