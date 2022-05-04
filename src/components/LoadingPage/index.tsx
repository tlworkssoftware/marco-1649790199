import React, {MutableRefObject, useRef} from 'react';
import {ActivityIndicator, Animated} from 'react-native';

import {Container} from './styles';

const LoadingPage: React.FC<{loading: boolean}> = ({loading}) => {
  const animated: MutableRefObject<any> = useRef(new Animated.Value(0));

  if (loading) {
    Animated.spring(animated.current, {
      toValue: 1,
      delay: 12,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.spring(animated.current, {
      toValue: 0,
      delay: 12,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Container style={{opacity: animated.current}}>
      <ActivityIndicator size="large" color="white" />
    </Container>
  );
};

export default LoadingPage;
