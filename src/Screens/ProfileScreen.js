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
} from 'react-native';
import BackgroundImage from '../../assets/PhotoBG.png';

import { textDefault, orange, darkBlue, black } from '../variables';
import { AntDesign, Feather } from '@expo/vector-icons';
import ProfilePost from '../Components/ProfilePost';

const ProfileScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground style={styles.imageBackground} resizeMode="stretch" source={BackgroundImage}>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <AntDesign style={styles.addAvatar} name="pluscircleo" size={25} color={orange} />
                </View>
                <Text style={styles.name}>User Name</Text>
                <TouchableOpacity style={styles.logout} onPress={() => navigation.navigate('Registration')}>
                    <Feather name="log-out" size={24} color="rgba(189, 189, 189, 1)" />
                </TouchableOpacity>
                <ProfilePost></ProfilePost>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',

        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 45,
        paddingTop: 32,

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'white',
    },
    avatar: {
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