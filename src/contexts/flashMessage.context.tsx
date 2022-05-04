import React, {createContext} from 'react';
import {
  showMessage,
  hideMessage,
  MessageOptions,
} from 'react-native-flash-message';
import {FlashMessage} from '../components';

interface FlashMessageContextData {
  showMessage: (data: MessageOptions) => void;
  hideMessage: () => void;
}

const FlashMessageContext = createContext<FlashMessageContextData>(
  {} as FlashMessageContextData,
);

export const FlashMessageProvider: React.FC = ({children}) => {
  return (
    <FlashMessageContext.Provider value={{showMessage, hideMessage}}>
      <FlashMessage />
      {children}
    </FlashMessageContext.Provider>
  );
};

export default FlashMessageContext;
