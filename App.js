import { StyleSheet, View } from 'react-native';

import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';
import Home from './Screens/Home';

import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_500Medium } from '@expo-google-fonts/roboto';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const MainStack = createStackNavigator();

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
        <NavigationContainer>
            <MainStack.Navigator initialRouteName="Registration">
                <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
                <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <MainStack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
