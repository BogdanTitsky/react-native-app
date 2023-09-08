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

import { textDefault, orange, darkBlue, black } from '../variables';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
const ProfilePost = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'http://placehold.it/350x240' }} style={styles.image}></Image>
            <Text style={styles.title}>Text</Text>
            <View style={styles.reviewsInfo}>
                <View style={styles.reviews}>
                    <MaterialCommunityIcons style={{ marginRight: 6 }} name="message-reply" size={24} color={orange} />
                    <Text style={{ marginRight: 24, fontFamily: 'Roboto_400Regular', fontSize: 16 }}>6</Text>
                    <AntDesign style={{ marginRight: 6 }} name="like2" size={24} color={orange} />
                    <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 16 }}>200</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Octicons style={{ marginRight: 6 }} name="location" size={24} color="#BDBDBD" />
                    <Text style={styles.country}>Country</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%' },
    image: {
        width: '100%',
        height: 240,
        marginBottom: 8,
        borderRadius: 8,
    },
    title: {
        marginBottom: 8,
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },
    reviewsInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviews: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    country: { fontFamily: 'Roboto_400Regular', fontSize: 16 },
});
export default ProfilePost;
