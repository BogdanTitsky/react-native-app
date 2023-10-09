import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from './Screens/auth/RegistrationScreen';
import LoginScreen from './Screens/auth/LoginScreen';
import Home from './Screens/Home';

export default function AppNavigation() {
    const MainStack = createStackNavigator();

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
