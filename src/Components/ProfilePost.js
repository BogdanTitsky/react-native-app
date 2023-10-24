import { useNavigation } from '@react-navigation/native';

import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { orange } from '../variables';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';

const ProfilePost = ({ name, photoUri, locationName, location, postId, comments }) => {
    const navigation = useNavigation();
    const [likes, SetLikes] = useState(0);
    const amountComments = comments.length;
    const handleLocationPress = () => {
        navigation.navigate('Map', { location });
    };
    const handleToLike = () => {
        if (likes === 0) {
            SetLikes(1);
        } else SetLikes(0);
    };
    return (
        <View style={styles.container}>
            <Image source={{ uri: photoUri ? photoUri : 'http://placehold.it/350x240' }} style={styles.image}></Image>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.reviewsInfo}>
                <View style={styles.reviews}>
                    <TouchableOpacity style={styles.reviews} onPress={() => navigation.navigate('Comments', { photoUri, postId })}>
                        <MaterialCommunityIcons style={{ marginRight: 6 }} name="message-reply" size={24} color={orange} />
                        <Text style={{ marginRight: 24, fontFamily: 'Roboto_400Regular', fontSize: 16 }}>{amountComments + 1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reviews} onPress={handleToLike}>
                        <AntDesign style={{ marginRight: 6 }} name={likes === 1 ? 'like1' : 'like2'} size={24} color={orange} />
                        <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 16 }}>{`${500 + likes}`}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'baseline' }} onPress={handleLocationPress}>
                    <Octicons style={{ marginRight: 6 }} name="location" size={24} color="#BDBDBD" />
                    <Text style={styles.country}>{locationName}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%', marginBottom: 32 },
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
