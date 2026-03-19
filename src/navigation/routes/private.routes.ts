import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductsStackParamList } from './products.routes';
import { UsersStackParamList } from './users.routes';

export enum PrivateRoutes {
  Products = 'Products',
  Users = 'Users',
  Example = 'Example',
}

export type PrivateStackParamList = {
  [PrivateRoutes.Products]: NavigatorScreenParams<ProductsStackParamList>;
  [PrivateRoutes.Users]: NavigatorScreenParams<UsersStackParamList>;
  [PrivateRoutes.Example]: undefined;
};

export type PrivateScreenProps<T extends keyof PrivateStackParamList> =
  NativeStackScreenProps<PrivateStackParamList, T>;
