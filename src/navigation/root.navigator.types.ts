import type { NavigatorScreenParams } from '@react-navigation/native';
import type { ExamplesStackParamList } from '@modules/examples/ui/navigation';

export type RootStackParamList = {
  Examples: NavigatorScreenParams<ExamplesStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
