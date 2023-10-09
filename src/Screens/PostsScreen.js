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

const PostsScreen = () => {
    const navigation = useNavigation();

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

    const logoutButton = () => (
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Feather name="log-out" size={24} color="rgba(189, 189, 189, 1)" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <View>
                    <Text style={styles.login}>Login</Text>
                    <Text style={styles.email}>Email</Text>
                </View>
            </View>
            <ProfilePost />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        width: '100%',
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