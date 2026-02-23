import { useRef } from 'react';
import { Animated } from 'react-native';

interface TransitionAnimationResult {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  animateTransition: (
    callback: () => void,
    direction: 'forward' | 'backward',
  ) => void;
}

export function useTransitionAnimation(): TransitionAnimationResult {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateTransition = (
    callback: () => void,
    direction: 'forward' | 'backward',
  ) => {
    const slideOutValue = direction === 'forward' ? -50 : 50;
    const slideInValue = direction === 'forward' ? 50 : -50;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: slideOutValue,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      slideAnim.setValue(slideInValue);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return { fadeAnim, slideAnim, animateTransition };
}
