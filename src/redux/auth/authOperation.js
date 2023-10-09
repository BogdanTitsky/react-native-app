import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';

export const registerDB = async ({ name, email, password, photo }) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
    }
};

export const loginDB = async ({ email, password }) => {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        return credentials.user;
    } catch (error) {
        console.log(error);
    }
};
