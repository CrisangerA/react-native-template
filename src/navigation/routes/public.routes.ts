import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ExamplesStackParamList } from './examples.routes';
import { AuthenticationStackParamList } from './authentication.routes';

export enum PublicRoutes {
  Examples = 'Examples',
  Authentication = 'Authentication',
}

export type PublicStackParamList = {
  [PublicRoutes.Examples]: NavigatorScreenParams<ExamplesStackParamList>;
  [PublicRoutes.Authentication]: NavigatorScreenParams<AuthenticationStackParamList>;
};

export type PublicScreenProps<T extends keyof PublicStackParamList> =
  NativeStackScreenProps<PublicStackParamList, T>;
