import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/auth/authOperation';
import { getPostsFromDB } from '../redux/posts/postsOperations';
import { useState } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import PostsList from '../Components/PostsList';
import { selectAvatar, selectEmail, selectIsLoggedIn, selectLogin } from '../redux/auth/authSelectors';

const PostsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [posts, setPosts] = useState([]);

    const login = useSelector(selectLogin);
    const email = useSelector(selectEmail);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const avatar = useSelector(selectAvatar);

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
        if (isLoggedIn) {
            getPostsFromDB()
                .then((data) => {
                    setPosts(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [isLoggedIn, posts]);

    return (
        <ScrollView style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: avatar,
                        }}
                    />
                    <View>
                        <Text style={styles.login}>{login}</Text>
                        <Text style={styles.email}>{email}</Text>
                    </View>
                </View>
                <PostsList posts={posts} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        backgroundColor: 'white',
    },
    container: {
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 32,

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
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
