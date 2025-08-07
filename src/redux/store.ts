import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slices/counterSlices';
import userReducer from './slices/userSlices';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
