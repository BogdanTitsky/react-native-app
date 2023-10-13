import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase/config';

const auth = FIREBASE_AUTH;

export const registerDB =
    ({ email, password, login }) =>
    async (dispatch, state) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            const user = auth.currentUser;
            await updateProfile(user, {
                displayName: login,
            });
            return user;
        } catch (error) {
            console.log(error);
            return alert('Sign up failed' + error.message);
        }
    };

export const loginDB =
    ({ email, password }) =>
    async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            return user;
        } catch (error) {
            console.log(error);
        }
    };
