import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase/config';
import { updateUserProfile, authSignOut } from './authSlice';
import { selectAvatar } from './authSelectors';
import { useSelector } from 'react-redux';

const auth = FIREBASE_AUTH;

export const registerDB =
    ({ email, password, login, photoURL }) =>
    async (dispatch) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            const user = auth.currentUser;
            await updateProfile(user, {
                displayName: login,
                photoURL,
            });

            const { uid, displayName, email: emailBase, photoURL: photoURLBase } = auth.currentUser;
            const userProfile = {
                userId: uid,
                login: displayName,
                email: emailBase,
                avatar: photoURLBase,
            };

            dispatch(updateUserProfile(userProfile));
            return user;
        } catch (error) {
            console.log(error);
            return alert('Sign up failed' + error.message);
        }
    };

export const loginDB =
    ({ email, password }) =>
    async (dispatch, state) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;

            const { uid, displayName, email: emailBase, photoURL } = auth.currentUser;
            const userProfile = {
                userId: uid,
                login: displayName,
                email: emailBase,
                avatar: photoURL,
            };

            dispatch(updateUserProfile(userProfile));
            return user;
        } catch (error) {
            console.log(error);
        }
    };

export const authStateChangeUser = () => async (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const { uid, displayName, email: emailBase, photoURL } = auth.currentUser;

            const userProfile = {
                userId: uid,
                login: displayName,
                email: emailBase,
                avatar: photoURL,
            };

            dispatch(updateUserProfile(userProfile));
        }
    });
};

export const authUpdateUser =
    ({ takeAvatar }) =>
    async (dispatch, state) => {
        try {
            const user = auth.currentUser;

            await updateProfile(user, {
                photoURL: takeAvatar,
            });

            const { uid, displayName, email, photoURL } = auth.currentUser;

            const userProfile = {
                userId: uid,
                login: displayName,
                email,
                avatar: photoURL,
            };

            dispatch(updateUserProfile(userProfile));
        } catch (error) {
            return console.log(error);
        }
    };

export const logOut = () => async (dispatch) => {
    try {
        await signOut(auth);

        dispatch(authSignOut());
    } catch (error) {
        console.log(error);
    }
};
