import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from './Screens/auth/RegistrationScreen';
import LoginScreen from './Screens/auth/LoginScreen';
import Home from './Screens/Home';

import { selectIsLoggedIn } from './redux/auth/authSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { authStateChangeUser } from './redux/auth/authOperation';
import { useEffect } from 'react';
import CommentsScreen from './Screens/CommentsScreen';

export default function AppNavigation() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const MainStack = createStackNavigator();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authStateChangeUser());
    }, []);

    return (
        <NavigationContainer>
            {!isLoggedIn ? (
                <MainStack.Navigator initialRouteName="Registration">
                    <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
                    <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                </MainStack.Navigator>
            ) : (
                <MainStack.Navigator>
                    <MainStack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <MainStack.Screen name="Comments" component={CommentsScreen} />
                </MainStack.Navigator>
            )}
        </NavigationContainer>
    );
}
