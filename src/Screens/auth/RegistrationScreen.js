import React, { useState } from 'react';
import BackgroundImage from '../../../assets/PhotoBG.png';
import { registerDB } from '../../redux/auth/authOperation';
import { AntDesign } from '@expo/vector-icons';
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
import { useDispatch } from 'react-redux';

const RegistrationScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoginFocused, setIsLoginFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const setToDefault = () => {
        setLogin('');
        setEmail('');
        setPassword('');
        setShowPassword(false);
        setIsEmailFocused(false);
        setIsPasswordFocused(false);
    };

    const handleRegistration = async () => {
        try {
            const formData = {
                login,
                email,
                password,
            };
            dispatch(registerDB(formData)).then((data) => {
                if (!data) {
                    alert(`Реєстрацію не виконано!`);
                    return;
                }
                setToDefault();
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground style={styles.imageBackground} resizeMode="stretch" source={BackgroundImage}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.avatar}>
                            <AntDesign style={styles.addAvatar} name="pluscircleo" size={25} color={orange} />
                        </View>
                        <Text style={[textDefault, styles.registrationText]}>Реєстрація</Text>
                        <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}>
                            <TextInput
                                style={[styles.input, isLoginFocused && styles.focusedInput]}
                                placeholder="Логін"
                                value={login}
                                onChangeText={setLogin}
                                onFocus={() => setIsLoginFocused(true)}
                                onBlur={() => setIsLoginFocused(false)}
                            />
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
                        </KeyboardAvoidingView>

                        <TouchableOpacity style={styles.registrationBtn} onPress={handleRegistration}>
                            <Text style={[textDefault, styles.registrationBtnText]}>Зареєструватися</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={textDefault} onPress={() => navigation.navigate('Login')}>
                                Вже є аккаунт? <Text>Увійти</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
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
});

export default RegistrationScreen;
