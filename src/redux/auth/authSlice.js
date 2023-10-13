import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
    login: null,
    email: null,
    avatar: null,
    userId: null,
    isLoggedIn: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            login: payload.login,
            userId: payload.userId,
            email: payload.email,
            avatar: payload.avatar,
            isLoggedIn: true,
        }),

        authSignOut: () => authInitialState,
    },
});

export const { updateUserProfile, authSignOut } = authSlice.actions;
