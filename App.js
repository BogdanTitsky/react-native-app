import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_500Medium } from '@expo-google-fonts/roboto';
import AppNavigation from './src/AppNavigation';
import { store, persistor } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
        Roboto_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
                <AppNavigation />
            </PersistGate>
        </Provider>
    );
}
