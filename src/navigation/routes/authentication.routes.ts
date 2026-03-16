import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum AuthenticationRoutes {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
}

export type AuthenticationStackParamList = {
  [AuthenticationRoutes.SignIn]: undefined;
  [AuthenticationRoutes.SignUp]: undefined;
};

export type AuthenticationScreenProps<
  T extends keyof AuthenticationStackParamList,
> = NativeStackScreenProps<AuthenticationStackParamList, T>;
