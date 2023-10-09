import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authSlice } from './auth/authSlice';
import { postSlice } from './posts/postsSlice';

const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: ['accessToken'],
};

const rootReducer = combineReducers({
    [authSlice.name]: persistReducer(persistConfig, authSlice.reducer),
    [postSlice.name]: postSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    thunk,
});

export const persistor = persistStore(store);
