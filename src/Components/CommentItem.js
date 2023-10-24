import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { textDefault } from '../variables';
function CommentItem({ usersAvatar, comment, createdAt }) {
    const dateObj = createdAt.toDate();
    const formattedDate = `${dateObj.getDate()} ${dateObj.toLocaleString('default', {
        month: 'long',
    })}, ${dateObj.getFullYear()} | ${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

    return (
        <View style={styles.myCommentWrapper}>
            <Image
                style={styles.myAvatar}
                source={{
                    uri: usersAvatar,
                }}
            />
            <View style={styles.myComment}>
                <Text style={textDefault}>{comment}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
        </View>
    );
}

export default CommentItem;

const styles = StyleSheet.create({
    myCommentWrapper: { flexDirection: 'row-reverse', marginBottom: 24 },
    myAvatar: {
        width: 36,
        height: 36,
        borderRadius: 50,

        marginLeft: 16,
    },
    myComment: {
        flex: 1,
        gap: 8,
        backgroundColor: '#F5F5F5',

        padding: 16,

        borderRadius: 6,
        borderTopRightRadius: 0,
    },
    date: { color: '#BDBDBD', textAlign: 'right' },
});
