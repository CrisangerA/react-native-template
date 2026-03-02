import { Easing } from 'react-native';

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 400,
  slow: 600,
  slowest: 1000,
} as const;

export const SPRING_CONFIGS = {
  gentle: { friction: 8, tension: 40 },
  bouncy: { friction: 6, tension: 40 },
} as const;

export const ANIMATION_EASING = {
  entrance: Easing.out(Easing.ease),
  exit: Easing.in(Easing.ease),
  loop: Easing.inOut(Easing.ease),
} as const;
