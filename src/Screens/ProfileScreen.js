import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackgroundImage from '../../assets/PhotoBG.png';
import { Dimensions } from 'react-native';
import { orange } from '../variables';
import { AntDesign, Feather } from '@expo/vector-icons';
import ProfilePost from '../Components/ProfilePost';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/auth/authOperation';
import { selectLogin } from '../redux/auth/authSelectors';
import PostsList from '../Components/PostsList';
import { useState } from 'react';
import { getPostsFromDB } from '../redux/posts/postsOperations';
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const login = useSelector(selectLogin);
    const [posts, setPosts] = useState([]);

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
        <ScrollView style={styles.wrapper}>
            <ImageBackground style={styles.imageBackground} resizeMode="cover" source={BackgroundImage}></ImageBackground>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <AntDesign style={styles.addAvatar} name="pluscircleo" size={25} color={orange} />
                </View>
                <Text style={styles.name}>{login}</Text>
                <TouchableOpacity style={styles.logout} onPress={() => dispatch(logOut())}>
                    <Feather name="log-out" size={24} color="rgba(189, 189, 189, 1)" />
                </TouchableOpacity>
                <PostsList posts={posts} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
    imageBackground: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container: {
        top: 200,
        justifyContent: 'center',

        width: '100%',
        paddingHorizontal: 16,

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'white',
    },
    avatar: {
        alignSelf: 'center',
        top: -60,
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: 'rgba(246, 246, 246, 1)',
        marginBottom: 32 - 60,
    },
    addAvatar: {
        position: 'absolute',
        right: -12,
        bottom: 14,
    },
    name: {
        alignSelf: 'center',

        fontSize: 30,
        fontFamily: 'Roboto_500Medium',
        marginBottom: 25,
    },
    logout: {
        position: 'absolute',
        top: 22,
        right: 16,
    },
});

export default ProfileScreen;
