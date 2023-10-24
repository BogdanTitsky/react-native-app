import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        createPost: (state, action) => {
            state.posts.push(action.payload);
        },
    },
});

export const { addComment } = postSlice.actions;
