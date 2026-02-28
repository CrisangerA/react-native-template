import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ExamplesStackParamList = {
  Landing: undefined;
  Texts: undefined;
  Buttons: undefined;
  TextInputs: undefined;
  Cards: undefined;
  Checkboxes: undefined;
  Modals: undefined;
  SignIn: undefined;
};

export type ExamplesScreenProps<T extends keyof ExamplesStackParamList> =
  NativeStackScreenProps<ExamplesStackParamList, T>;
