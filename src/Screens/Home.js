import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import { orange } from '../variables';

import { View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import TakeCamera from '../Components/TakeCamera';
import CommentsScreen from './CommentsScreen';
import MapScreen from './MapScreen';

const Home = () => {
    const Tabs = createBottomTabNavigator();

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
                component={PostsScreenStackCreator}
                options={{
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="CreatePost"
                component={CreatePostStackCreator}
                options={{
                    headerShown: false,
                }}
                tabBarVisible={false}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileScreenStackCreator}
                options={{
                    headerShown: false,
                }}
            />
        </Tabs.Navigator>
    );
};
const ProfileScreenStackCreator = () => {
    const ClientStack = createStackNavigator();

    return (
        <ClientStack.Navigator>
            <ClientStack.Screen
                name="ProfileMain"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />

            <ClientStack.Screen
                name="Map"
                component={MapScreen}
                options={{
                    headerShown: false,
                    tabBarVisible: false,
                    tabBarStyle: { display: 'none' },
                }}
                tabBarVisible={false}
            />
        </ClientStack.Navigator>
    );
};
const PostsScreenStackCreator = () => {
    const ClientStack = createStackNavigator();

    return (
        <ClientStack.Navigator>
            <ClientStack.Screen name="PostMain" component={PostsScreen} />

            <ClientStack.Screen
                name="Map"
                component={MapScreen}
                options={{
                    headerShown: false,
                    tabBarVisible: false,
                }}
            />
        </ClientStack.Navigator>
    );
};

const CreatePostStackCreator = () => {
    const ClientStack = createStackNavigator();
    return (
        <ClientStack.Navigator>
            <ClientStack.Screen name="CreatePostMain" component={CreatePostsScreen} />
            <ClientStack.Screen
                name="Map"
                component={MapScreen}
                options={{
                    headerShown: false,
                }}
            />
        </ClientStack.Navigator>
    );
};

export default Home;
