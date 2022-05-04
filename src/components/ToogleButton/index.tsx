import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components';

import {Container, Label, Toggle} from './styles';

type ToggleProps = {
  label?: string;
  isEnabled: boolean;
  setIsEnabled: (e: boolean) => void;
};

const ToggleButton: React.FC<ToggleProps> = ({
  label,
  isEnabled,
  setIsEnabled,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Toggle
        trackColor={{
          false: theme.colors.greyLight200,
          true: theme.colors.green100,
        }}
        thumbColor={isEnabled ? theme.colors.white : theme.colors.white}
        onValueChange={setIsEnabled}
        value={isEnabled}
      />
    </Container>
  );
};

export default ToggleButton;
