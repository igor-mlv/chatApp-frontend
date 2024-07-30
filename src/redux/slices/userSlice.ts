import { createSlice } from "@reduxjs/toolkit";

const USERS_DATABASE = [
    { id: "1", socketID: "", userName: "superuser", isOnline: false, rooms: ["room1", "room2"] },
];

interface UserState {
    id: string,
    userName: string;
    isOnline: boolean;
    socketID: string;
    rooms: string[];
}

const initialState: UserState = {
    id: "",
    userName: "",
    isOnline: false,
    socketID: "",
    rooms: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;