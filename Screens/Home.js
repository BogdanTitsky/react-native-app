import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { orange } from '../variables';

import { TouchableOpacity, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const Home = () => {
    const navigation = useNavigation();

    const Tabs = createBottomTabNavigator();

    const logoutButton = () => (
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Feather name="log-out" size={24} color="rgba(189, 189, 189, 1)" />
        </TouchableOpacity>
    );

    return (
        <Tabs.Navigator
            initialRouteName="Profile"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarActiveTintColor: orange,
                tabBarStyle: {
                    height: 62,
                    alignItems: 'center',
                },

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;
                    let style = {};
                    focused = orange;
                    size = 24;

                    if (rn === 'Posts') {
                        iconName = 'grid';
                    } else if (rn === 'CreatePost') {
                        iconName = 'plus';
                        color = 'white';
                        size = 22;
                        style = { backgroundColor: orange, paddingHorizontal: 28, paddingVertical: 10, borderRadius: 20 };
                    } else if (rn === 'Profile') {
                        iconName = 'user';
                    }
                    return (
                        <View style={style}>
                            <Feather name={iconName} size={size} color={color} />
                        </View>
                    );
                },
            })}
        >
            <Tabs.Screen
                name="Posts"
                component={PostsScreen}
                options={{
                    title: 'Публікації',
                    headerTitleStyle: {
                        fontFamily: 'Roboto_500Medium',
                        lineHeight: 22,
                    },
                    headerTitleAlign: 'center',

                    headerRight: logoutButton,

                    headerRightContainerStyle: {
                        paddingRight: 16,
                    },
                    headerTitleContainerStyle: {
                        paddingLeft: 16,
                    },
                    headerStyle: {
                        borderBottomColor: 'rgba(189, 189, 189, 1)',
                        borderBottomWidth: 1,
                    },
                }}
            />
            <Tabs.Screen
                name="CreatePost"
                component={CreatePostsScreen}
                options={{
                    title: 'Створити публікацію',
                    headerTitleStyle: {
                        fontFamily: 'Roboto_500Medium',
                        lineHeight: 22,
                    },
                    headerTitleAlign: 'center',
                    tabBarStyle: { display: 'none' },
                }}
            />

            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Tabs.Navigator>
    );
};

const ClientStackCreator = () => {
    const ClientStack = createStackNavigator();

    return (
        <ClientStack.Navigator>
            <ClientStack.Screen
                name="Comments"
                component={CreatePostsScreen}
                options={{
                    title: 'Коментарі',
                    headerTitleStyle: {
                        fontFamily: 'Roboto_500Medium',
                        lineHeight: 22,
                    },
                    headerTitleAlign: 'center',

                    headerRight: logoutButton,

                    headerRightContainerStyle: {
                        paddingRight: 16,
                    },
                    headerTitleContainerStyle: {
                        paddingLeft: 16,
                    },

                    headerStyle: {
                        borderBottomColor: 'rgba(189, 189, 189, 1)',
                        borderBottomWidth: 1,
                    },
                }}
            />
        </ClientStack.Navigator>
    );
};

export default Home;
