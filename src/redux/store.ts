import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice";
import newChatUsersReducer from './slices/newChatUsers';

const store = configureStore({
    reducer: {
        user: userReducer,
        newChatUsers: newChatUsersReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;