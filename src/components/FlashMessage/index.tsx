import React from 'react';
import FlashMessage from 'react-native-flash-message';

import {Container} from './styles';

const FlashMessageCustom: React.FC = () => {
  return (
    <Container elevation={1}>
      <FlashMessage position="top" duration={3000} />
    </Container>
  );
};

export default FlashMessageCustom;
