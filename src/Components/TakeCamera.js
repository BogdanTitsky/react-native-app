import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const TakeCamera = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photoUri, setPhotoUri] = useState(null);

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

    return (
        <View style={styles.container}>
            {photoUri ? (
                <Image source={{ uri: photoUri }} style={{ flex: 1 }} />
            ) : (
                <Camera style={styles.camera} type={type} ref={setCameraRef}>
                    <View style={styles.photoView}>
                        <TouchableOpacity
                            style={styles.flipContainer}
                            onPress={() => {
                                setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
                            }}
                        >
                            <Text style={{ fontSize: 20, marginBottom: 10, color: 'white' }}> Flip </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async () => {
                                console.log(cameraRef);
                                if (cameraRef) {
                                    const { uri } = await cameraRef.takePictureAsync();
                                    await MediaLibrary.createAssetAsync(uri);
                                    setPhotoUri(uri);
                                    console.log('fotho');
                                }
                            }}
                        >
                            <View style={styles.takePhotoOut}>
                                <View style={styles.takePhotoInner}></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20, // Здесь задайте радиус границы
        overflow: 'hidden',
    },
    camera: { flex: 1, paddingBottom: 90, padding: 10 },

    flipContainer: {
        flex: 0.1,
        alignSelf: 'flex-end',
    },

    button: { alignSelf: 'center' },

    takePhotoOut: {
        borderWidth: 2,
        borderColor: 'white',
        height: 70,
        width: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },

    takePhotoInner: {
        borderWidth: 2,
        borderColor: 'white',
        height: 60,
        width: 60,
        backgroundColor: 'white',
        borderRadius: 50,
    },
});

export default TakeCamera;
