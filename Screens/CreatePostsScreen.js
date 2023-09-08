import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { textDefault, orange, darkBlue, black } from '../variables';

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
import * as Location from 'expo-location';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
{
    /* <SimpleLineIcons name="location-pin" size={24} color="black" />; */
}

const CreatePostsScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                </TouchableOpacity>
            ),
            headerLeftContainerStyle: {
                paddingLeft: 16,
            },
            headerTitleContainerStyle: {},

            headerStyle: {
                borderBottomColor: 'rgba(189, 189, 189, 1)',
                borderBottomWidth: 1,
            },
        });
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.wrapper}
                enabled
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <View style={styles.container}>
                    <View>
                        <View style={styles.camera}>
                            <View style={styles.iconcam}>
                                <FontAwesome name="camera" size={22} color="#BDBDBD" />
                            </View>
                        </View>
                        {/* <MapView
                    style={styles.mapStyle}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    mapType="standard"
                    minZoomLevel={15}
                    onMapReady={() => console.log('Map is ready')}
                    onRegionChange={() => console.log('Region change')}
                >
                    <Marker title="I am here" coordinate={{ latitude: 37.78825, longitude: -122.4324 }} description="Hello" />
                </MapView> */}

                        <Text style={styles.text}>Завантажте фото</Text>
                        <TextInput style={styles.input} placeholder="Назва..."></TextInput>
                        <View style={styles.locationWrap}>
                            <Ionicons style={styles.locationIcon} name="ios-location-outline" size={24} color="#BDBDBD" />
                            <TextInput style={[styles.input, styles.location]} placeholder="Місцевість..."></TextInput>
                        </View>
                        <TouchableOpacity style={styles.registrationBtn}>
                            <Text style={[textDefault, styles.registrationBtnText]}>Увійти</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.trash}>
                        <Feather name="trash-2" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,

        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 34,

        borderTopColor: 'black',

        backgroundColor: 'white',

        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    camera: {
        width: '100%',
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#DBDBDB',
        borderRadius: 8,
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconcam: {
        width: 60,
        height: 60,
        borderRadius: 50,

        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginBottom: 32,
        color: '#BDBDBD',
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
    },

    input: {
        borderColor: '#DBDBDB',
        borderBottomWidth: 1,
        height: 50,
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
    },
    locationWrap: {
        position: 'relative',
    },
    locationIcon: {
        position: 'absolute',
        top: 13,
    },
    location: {
        marginBottom: 32,
        paddingLeft: 28,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    registrationBtn: {
        width: '100%',
        height: 50,
        marginBottom: 16,
        paddingVertical: 12,

        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 100,
        backgroundColor: orange,
    },
    registrationBtnText: {
        color: 'white',
    },
    trash: {
        alignSelf: 'center',
        width: 70,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#F6F6F6',
        borderRadius: 20,
    },
});
export default CreatePostsScreen;
