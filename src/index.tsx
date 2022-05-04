import React from 'react';
import {StackNavigator} from './navigation';
import theme from './styles/theme';
import {ThemeProvider} from 'styled-components/native';
import {FlashMessageProvider} from './contexts/flashMessage.context';
import { AuthProvider } from './contexts/auth.context';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <FlashMessageProvider>
          <StackNavigator />
        </FlashMessageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
