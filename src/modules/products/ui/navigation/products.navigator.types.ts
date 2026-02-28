import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ProductsStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
  ProductForm: { productId?: string };
};

export type ProductsScreenProps<T extends keyof ProductsStackParamList> =
  NativeStackScreenProps<ProductsStackParamList, T>;
