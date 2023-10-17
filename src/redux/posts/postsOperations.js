import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../firebase/config';

const auth = FIREBASE_AUTH;

export const addPostToDB = async ({ photoUri, name, location }) => {
    try {
        const { uid } = auth.currentUser;
        const docRef = await addDoc(collection(FIREBASE_DB, 'posts'), {
            photoUri,
            name,
            location,
            userId: uid,
        });

        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
        throw e;
    }
};

export const getPostsFromDB = async () => {
    try {
        const { uid } = auth.currentUser;

        const q = query(collection(FIREBASE_DB, 'posts'), where('userId', '==', uid));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
        return posts;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
