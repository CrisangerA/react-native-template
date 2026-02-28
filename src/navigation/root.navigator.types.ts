import type { NavigatorScreenParams } from '@react-navigation/native';
import type { ExamplesStackParamList } from '@modules/examples/ui/navigation';
import type { ProductsStackParamList } from '@modules/products/ui/navigation';

export type RootStackParamList = {
  Examples: NavigatorScreenParams<ExamplesStackParamList>;
  Products: NavigatorScreenParams<ProductsStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
