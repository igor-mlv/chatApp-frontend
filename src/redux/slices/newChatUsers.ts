import { createSlice } from "@reduxjs/toolkit";

export interface NewChatUsersType {
    id: string,
    userName: string,
    isSelected?: boolean,
}

const initialState: NewChatUsersType[] = [];

const newChatUsersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action) {
            return action.payload;
        },
        toggleSelection(state, action) {
            const userID = action.payload;
            return state.map((user) =>
                user.id === userID
                    ? { ...user, isSelected: !user.isSelected }
                    : user
            );
        },
    },
});

export const { setUsers, toggleSelection } = newChatUsersSlice.actions;

export default newChatUsersSlice.reducer;