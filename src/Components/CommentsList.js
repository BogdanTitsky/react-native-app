import React from 'react';
import { View } from 'react-native';
import CommentItem from './CommentItem';

function CommentsList({ comments }) {
    return (
        <View>
            {comments.map(({ id, data: { usersAvatar, comment, createdAt } }) => (
                <CommentItem key={id} usersAvatar={usersAvatar} comment={comment} createdAt={createdAt} />
            ))}
        </View>
    );
}

export default CommentsList;
