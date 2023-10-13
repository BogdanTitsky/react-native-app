import React, { useState } from 'react';
import BackgroundImage from '../../../assets/PhotoBG.png';

import { textDefault, orange, darkBlue, black } from '../../variables';
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
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebase/config';
import { loginDB } from '../../redux/auth/authOperation';
import { useDispatch } from 'react-redux';

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const setToDefault = () => {
        setEmail('');
        setPassword('');
        setShowPassword(false);
        setIsEmailFocused(false);
        setIsPasswordFocused(false);
    };

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) return console.warn('Будь ласка заповніть поля');

        const formData = {
            email,
            password,
        };
        dispatch(loginDB(formData)).then((data) => {
            if (!data) {
                alert(`Error login or password`);
                return;
            }
            setToDefault();
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.wrapper}
                enabled
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -130}
            >
                <ImageBackground style={styles.imageBackground} resizeMode="stretch" source={BackgroundImage}>
                    <View style={styles.container}>
                        <Text style={[textDefault, styles.registrationText]}>Увійти</Text>
                        <TextInput
                            style={[styles.input, isEmailFocused && styles.focusedInput]}
                            placeholder="Адреса електронної пошти"
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                        />
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={[styles.input, isPasswordFocused && styles.focusedInput]}
                                placeholder="Пароль"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                            />
                            <View style={styles.showHideContainer}>
                                <TouchableOpacity style={styles.showHideButton} onPress={() => setShowPassword(!showPassword)}>
                                    <Text style={textDefault}>{showPassword ? 'Сховати' : 'Показати'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.registrationBtn} onPress={handleLogin}>
                            <Text style={[textDefault, styles.registrationBtnText]}>Увійти</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={textDefault} onPress={() => navigation.navigate('Registration')}>
                                Немає акаунту? <Text style={styles.underline}>Зареєструватися</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
    focusedInput: {
        borderColor: orange,
        backgroundColor: 'white',
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
    underline: {
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
