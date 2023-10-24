import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import 'firebase/auth';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBahm7MfPy2ZXBIAwWMHDJaZV3TRVisrYs',
    authDomain: 'reactnativeapp-6d956.firebaseapp.com',
    databaseURL: 'https://reactnativeapp-6d956-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'reactnativeapp-6d956',
    storageBucket: 'reactnativeapp-6d956.appspot.com',
    messagingSenderId: '405661665197',
    appId: '1:405661665197:web:54230a2f03b747cab14324',
    measurementId: 'G-P17T99V58Y',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const FIREBASE_DB = getFirestore(FIREBASE_APP);
