import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
