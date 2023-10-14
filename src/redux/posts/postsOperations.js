import { collection, addDoc, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase/config';

export const addPostToDB = async ({ photoUri, name, location }) => {
    try {
        const docRef = await addDoc(collection(FIREBASE_DB, 'posts'), {
            photoUri,
            name,
            location,
        });

        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
        throw e;
    }
};

export const getPostsFromDB = async () => {
    try {
        const snapshot = await getDocs(collection(FIREBASE_DB, 'posts'));
        const posts = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
        return posts;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
