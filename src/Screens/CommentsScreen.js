import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, View, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { orange, textDefault } from '../variables';
import { useEffect } from 'react';
import { useState } from 'react';
import { addComment, getCommentsFromDB } from '../redux/posts/postsOperations';
import CommentsList from '../Components/CommentsList';

const CommentsScreen = ({ route }) => {
    const navigation = useNavigation();

    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getCommentsFromDB(postId)
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [postId, newComment]);

    const { photoUri, postId } = route.params;

    const headerOptions = {
        title: 'Коментарії',
        headerTitleStyle: {
            fontFamily: 'Roboto_500Medium',
            lineHeight: 22,
        },
        headerTitleAlign: 'center',

        headerRightContainerStyle: {
            paddingRight: 16,
        },
        headerTitleContainerStyle: {
            paddingLeft: 16,
        },
        headerStyle: {
            borderBottomColor: 'rgba(189, 189, 189, 1)',
            borderBottomWidth: 1,
        },
    };

    useEffect(() => {
        navigation.setOptions(headerOptions);
    });

    const handleAddComment = () => {
        addComment({ postId, comment: newComment });
        setNewComment('');
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: photoUri ? photoUri : 'http://placehold.it/350x240' }} style={styles.image}></Image>
            <ScrollView style={styles.commentsListWrapper}>
                <View style={styles.commentWrapper}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <View style={styles.comment}>
                        <Text style={textDefault}>
                            Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!
                        </Text>
                    </View>
                </View>
                <CommentsList comments={comments} />
            </ScrollView>
            <View style={styles.addCommentsWrapper}>
                <TextInput
                    style={[styles.addCommentInput, textDefault]}
                    placeholder="Коментувати..."
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity style={styles.addCommentBtn} onPress={handleAddComment}>
                    <AntDesign style={{}} name="arrowup" size={22} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        height: '100%',
        paddingHorizontal: 16,

        borderTopColor: 'black',

        backgroundColor: 'white',
    },
    image: {
        marginTop: 32,
        width: '100%',
        height: 240,
        marginBottom: 32,
        borderRadius: 8,
    },
    commentsListWrapper: { marginBottom: 30 },
    commentWrapper: { flexDirection: 'row', marginBottom: 24 },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 50,

        marginRight: 16,
    },
    comment: {
        flex: 1,
        backgroundColor: '#F5F5F5',

        padding: 16,

        borderRadius: 6,
        borderTopLeftRadius: 0,
    },
    myCommentWrapper: { flexDirection: 'row-reverse', marginBottom: 24 },
    myAvatar: {
        width: 36,
        height: 36,
        borderRadius: 50,

        marginLeft: 16,
    },
    myComment: {
        flex: 1,
        backgroundColor: '#F5F5F5',

        padding: 16,

        borderRadius: 6,
        borderTopRightRadius: 0,
    },
    addCommentsWrapper: { borderRadius: 50, paddingBottom: 16 },
    addCommentInput: {
        backgroundColor: 'rgba(246, 246, 246, 1)',
        borderRadius: 100,
        borderColor: '#E8E8E8',
        borderWidth: 1,
        height: 50,
        paddingLeft: 16,
        paddingRight: 8,
    },
    addCommentBtn: {
        position: 'absolute',
        right: 8,
        top: 8,
        borderRadius: 50,
        backgroundColor: orange,
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CommentsScreen;
