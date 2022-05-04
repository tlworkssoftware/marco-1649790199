import * as React from 'react';

export const navigationRef = React.createRef<any>();

export const navigate = (name: string, params: any) => {
  return navigationRef.current?.navigate(name, params);
};
