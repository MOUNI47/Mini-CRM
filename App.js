
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator /></View>} persistor={persistor}>
        <PaperProvider>
          <RootNavigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
