import React from 'react';
import { ScrollView } from 'react-native';
import ProfilePost from './ProfilePost';

function PostsList({ posts }) {
    return (
        <ScrollView>
            {posts.map(({ id, data: { name, photoUri, locationName, location, comments } }) => (
                <ProfilePost
                    key={id}
                    name={name}
                    photoUri={photoUri}
                    locationName={locationName}
                    location={location}
                    postId={id}
                    comments={comments}
                />
            ))}
        </ScrollView>
    );
}

export default PostsList;
