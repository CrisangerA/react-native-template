import 'react-native-screens';
import AppProvider from 'src/providers/AppProvider';
import RootNavigator from '@navigation/RootNavigator';

function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}

export default App;
