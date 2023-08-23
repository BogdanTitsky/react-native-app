import React from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BackgroundImage from '../assets/PhotoBG.png';
import { AntDesign } from '@expo/vector-icons';
import { textDefault, orange, darkBlue, black } from '../variables';

const RegistrationScreen = () => {
    return (
        <ImageBackground style={styles.imageBackground} resizeMode="stretch" source={BackgroundImage}>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <AntDesign style={styles.addAvatar} name="pluscircleo" size={25} color={orange} />
                </View>
                <Text style={[textDefault, styles.registrationText]}>Реєстрація</Text>
                <TextInput style={styles.input} placeholder="Логін" />
                <TextInput style={styles.input} placeholder="Адреса електронної пошти" />
                <View style={styles.passwordWrapper}>
                    <TextInput style={styles.input} placeholder="Пароль" secureTextEntry />
                    <View style={styles.showHideContainer}>
                        <TouchableOpacity style={styles.showHideButton}>
                            <Text style={textDefault}>Показати</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.registrationBtn} onPress={() => alert('Зареєстровано!')}>
                    <Text style={[textDefault, styles.registrationBtnText]}>Зареєструватися</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={() => alert('Зареєстровано!')}>
                    <Text style={textDefault}>Вже є аккаунт? Увійти</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
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
    registrationText: {
        marginBottom: 32,

        fontSize: 30,
        fontFamily: 'Roboto_500Medium',

        lineHeight: 35,
        color: black,
    },
    input: {
        width: '100%',
        height: 50,
        marginBottom: 16,
        padding: 10,

        borderWidth: 1,
        borderColor: 'rgba(232, 232, 232, 1)',
        borderRadius: 8,
        backgroundColor: 'rgba(246, 246, 246, 1)',
    },
    passwordWrapper: {
        width: '100%',
        marginBottom: 43 - 16,
    },
    showHideContainer: {
        position: 'absolute',
        right: 0,
        height: 50,
        justifyContent: 'center',
    },
    showHideButton: {
        paddingHorizontal: 16,
    },
    showHideButtonText: {
        color: darkBlue,
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
    loginBtn: {},
    loginBtnText: {},
});

export default RegistrationScreen;
