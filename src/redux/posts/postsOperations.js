import { collection, addDoc, query, where, getDocs, orderBy, Timestamp, setDoc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../firebase/config';
const auth = FIREBASE_AUTH;

export const addPostToDB =
    ({ photoUri, name, locationName, location }) =>
    async (dispatch) => {
        try {
            const { uid } = auth.currentUser;
            const createdAt = Timestamp.now();
            const docRef = await addDoc(collection(FIREBASE_DB, 'posts'), {
                photoUri,
                name,
                location,
                locationName,
                userId: uid,
                createdAt,
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
        const q = query(collection(FIREBASE_DB, 'posts'), where('userId', '==', uid), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const posts = [];

        for (const doc of querySnapshot.docs) {
            const postData = doc.data();
            const commentsQuery = query(collection(FIREBASE_DB, 'posts', doc.id, 'comments'));
            const commentsSnapshot = await getDocs(commentsQuery);
            const comments = commentsSnapshot.docs.map((commentDoc) => ({ id: commentDoc.id, data: commentDoc.data() }));

            posts.push({
                id: doc.id,
                data: {
                    ...postData,
                    comments: comments,
                },
            });
        }
        return posts;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addComment = async ({ postId, comment }) => {
    try {
        const { displayName, photoURL } = auth.currentUser;

        const createdAt = Timestamp.now();

        const commentData = {
            comment,
            userName: displayName,
            usersAvatar: photoURL,
            createdAt,
        };
        const docRef = await addDoc(collection(FIREBASE_DB, 'posts', postId, 'comments'), commentData);
        console.log('Comment added with ID: ', docRef.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCommentsFromDB = async (postId) => {
    try {
        const comments = [];
        const q = query(collection(FIREBASE_DB, 'posts', postId, 'comments'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            comments.push({ id: doc.id, data: doc.data() });
        });

        return comments;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
