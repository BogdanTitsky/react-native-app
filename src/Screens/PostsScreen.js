import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    View,
    KeyboardAvoidingView,
    Image,
    Dimensions,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import ProfilePost from '../Components/ProfilePost';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/auth/authOperation';
import { getPostsFromDB } from '../redux/posts/postsOperations';
import { useState } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import PostsList from '../Components/PostsList';
import { selectEmail, selectLogin } from '../redux/auth/authSelectors';

const PostsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);
    const login = useSelector(selectLogin);
    const email = useSelector(selectEmail);

    const logoutButton = () => (
        <TouchableOpacity onPress={() => dispatch(logOut())}>
            <Feather name="log-out" size={24} color="rgba(189, 189, 189, 1)" />
        </TouchableOpacity>
    );

    const headerOptions = {
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
    };

    useEffect(() => {
        navigation.setOptions(headerOptions);
    });

    useEffect(() => {
        getPostsFromDB()
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <View>
                    <Text style={styles.login}>{login}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
            <PostsList posts={posts} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingHorizontal: 16,
        paddingTop: 32,

        borderTopColor: 'black',

        backgroundColor: 'white',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 16,
    },
    profile: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginBottom: 32,
    },
    login: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 14,
    },
    email: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 12,
        color: 'rgba(33, 33, 33, 0.8)',
    },
});
export default PostsScreen;
