import React from 'react';
import { ScrollView } from 'react-native';
import ProfilePost from './ProfilePost';

function PostsList({ posts }) {
    return (
        <ScrollView>
            {posts.map(({ id, data: { name, photoUri, location } }) => (
                <ProfilePost key={id} name={name} photoUri={photoUri} location={location} />
            ))}
        </ScrollView>
    );
}

export default PostsList;
