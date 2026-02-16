/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AppProvider from 'src/providers/AppProvider';
import RootView from '@modules/examples/ui/RootView';

function App() {
  return (
    <AppProvider>
      <RootView />
    </AppProvider>
  );
}
 
export default App;
