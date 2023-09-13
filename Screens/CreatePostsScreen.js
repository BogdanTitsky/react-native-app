import { useNavigation } from '@react-navigation/native';
import {} from 'react-native';

import React, { useState, useEffect, useRef } from 'react';

import { FontAwesome, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { textDefault, orange, darkBlue, black } from '../variables';

import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import {
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
    Platform,
} from 'react-native';

const CreatePostsScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photoUri, setPhotoUri] = useState(null);

    const headerOptions = {
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
        title: 'Створити публікацію',
        headerTitleStyle: {
            fontFamily: 'Roboto_500Medium',
            lineHeight: 22,
        },
        headerTitleAlign: 'center',
    };
    useEffect(() => {
        navigation.setOptions(headerOptions);
    });

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const reset = () => {
        setPhotoUri(null);
        setName('');
        setLocation('');
    };

    const onPublish = () => {
        console.log(name);
        console.log(location);
        reset();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.wrapper}
                enabled
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -130}
            >
                <View style={styles.container}>
                    <View>
                        <View style={styles.cameraWrapper}>
                            {photoUri ? (
                                <Image source={{ uri: photoUri }} style={styles.camera} />
                            ) : (
                                <Camera style={styles.camera} type={type} ref={setCameraRef}>
                                    <View style={styles.photoView}>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={async () => {
                                                if (cameraRef) {
                                                    const { uri } = await cameraRef.takePictureAsync();
                                                    await MediaLibrary.createAssetAsync(uri);
                                                    setPhotoUri(uri);
                                                    console.log('fotho');
                                                }
                                            }}
                                        >
                                            <View style={styles.iconcam}>
                                                <FontAwesome name="camera" size={22} color="#BDBDBD" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </Camera>
                            )}
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
                        <TextInput style={styles.input} placeholder="Назва..." value={name} onChangeText={setName}></TextInput>
                        <View style={styles.locationWrap}>
                            <Ionicons style={styles.locationIcon} name="ios-location-outline" size={24} color="#BDBDBD" />
                            <TextInput
                                style={[styles.input, styles.location]}
                                placeholder="Місцевість..."
                                value={location}
                                onChangeText={setLocation}
                            ></TextInput>
                        </View>
                        <TouchableOpacity style={styles.registrationBtn} onPress={onPublish}>
                            <Text style={[textDefault, styles.registrationBtnText]}>Опублікувати</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.trash} onPress={reset}>
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
    cameraWrapper: {
        width: '100%',
        height: 240,

        borderWidth: 1,
        borderColor: '#DBDBDB',
        borderRadius: 8,

        marginBottom: 8,

        overflow: 'hidden',
        backgroundColor: '#F6F6F6',
    },
    camera: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: { alignSelf: 'center' },

    iconcam: {
        width: 60,
        height: 60,
        borderRadius: 50,

        backgroundColor: 'rgba(198, 198, 198, 0.3)',
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
        width: '100%',
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
