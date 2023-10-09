import { useNavigation } from '@react-navigation/native';
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
} from 'react-native';

const CommentsScreen = () => {
    const navigation = useNavigation();

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

export default CommentsScreen;
